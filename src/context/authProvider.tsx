import { WEB_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  User,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { usePostAuth } from '@/features/Auth/api/postAuth';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { auth } from '@/lib/firebase-config';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

type Auth = {
  user: User | null;
  loading: boolean;
  clearUser: () => void;
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
  const { postAuth } = usePostAuth();
  useProtectedRoute(user);
  useEffect(() => {
    // googlesigninを行う場合に必須で呼び出すもの
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);
  // ユーザー情報のクリア
  const clearUser = useCallback(() => {
    setUser(null);
  }, []);
  // Google の認証応答からの ID トークンを Firebase 認証情報と交換し、それを使用して Firebase での認証を行う
  const handleCredentialResponse = async (googleIdToken: string) => {
    const credential = GoogleAuthProvider.credential(googleIdToken);

    const result = await signInWithCredential(auth, credential);
    if (result) {
      const token = await result.user.getIdToken();
      secureStoreService.save(StoreKeyEnum.TOKEN, token);
      setUser(result.user);
    }
  };

  const handleRedirect = async () => {
    // google側にログインしているユーザーの情報を取得する
    const userInfo = await GoogleSignin.signInSilently();

    if (userInfo && userInfo.idToken) {
      await handleCredentialResponse(userInfo.idToken);
    }
  };

  useEffect(() => {
    handleRedirect();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await secureStoreService.getValueFor(StoreKeyEnum.TOKEN);
        if (!token) {
          const newToken = await currentUser.getIdToken();
          await secureStoreService.save(StoreKeyEnum.TOKEN, newToken);
        }
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
        await handleCredentialResponse(userInfo.idToken);
      }
      await postAuth();
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
    clearUser,
  };
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authContext = useAuthProvider();
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
