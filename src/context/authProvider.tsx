import { WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  User,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { auth } from '@/lib/firebase-config';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

type Auth = {
  user: User | null;
  loading: boolean;
  googleSignIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Auth>({} as Auth);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useProtectedRoute(user);
  useEffect(() => {
    // googlesigninを行う場合に必須で呼び出すもの
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);
  // Google の認証応答からの ID トークンを Firebase 認証情報と交換し、それを使用して Firebase での認証を行う
  const handleCredentialResponse = async (googleIdToken: string) => {
    const credential = GoogleAuthProvider.credential(googleIdToken);

    const result = await signInWithCredential(auth, credential);
    if (result) {
      setUser(result.user);
    }
  };

  const handleRedirect = async () => {
    // google側にログインしているユーザーの情報を取得する
    const userInfo = await GoogleSignin.signInSilently();

    if (userInfo && userInfo.idToken) {
      // TODO: トークンは保存する必要があるか確認する
      secureStoreService.save(StoreKeyEnum.TOKEN, userInfo?.idToken);
      await handleCredentialResponse(userInfo.idToken);
    }
  };

  useEffect(() => {
    handleRedirect();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      unsubscribe();
    });
  }, [setUser]);

  const googleSignIn = async (): Promise<boolean> => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.idToken) {
        secureStoreService.save(StoreKeyEnum.TOKEN, userInfo?.idToken);
        await handleCredentialResponse(userInfo.idToken);
      }
      setLoading(false);
      return true;
    } catch {
      setLoading(false);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await firebaseSignOut(auth);
      await secureStoreService.deleteValueFor(StoreKeyEnum.TOKEN);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    loading,
    googleSignIn,
    signOut,
  };
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authContext = useAuthProvider();
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
