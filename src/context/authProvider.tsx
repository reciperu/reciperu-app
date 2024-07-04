import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import {
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  User,
  signOut as firebaseSignOut,
  UserCredential,
} from 'firebase/auth';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { usePostAuth } from '@/features/Auth/apis/postAuth';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import AsyncStorage from '@/lib/asyncStorage';
import { auth } from '@/lib/firebase-config';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

type Auth = {
  user: User | null;
  googleAuthPending: boolean;
  appleAuthPending: boolean;
  initialize: boolean;
  clearUser: () => void;
  signInWithGoogle: () => Promise<boolean>;
  signInWithApple: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Auth>({} as Auth);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [googleAuthPending, setGoogleAuthPending] = useState(false);
  const [appleAuthPending, setAppleAuthPending] = useState(false);
  const [initialize, setInitialize] = useState(false);
  const mutation = usePostAuth({});
  // パスのリダイレクト処理を行う
  useProtectedRoute(user);
  useEffect(() => {
    // googlesigninを行う場合に必須で呼び出すもの
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    });
  }, []);
  // ユーザー情報のクリア
  const clearUser = useCallback(() => {
    setUser(null);
  }, []);
  // Google の認証応答からの ID トークンを Firebase 認証情報と交換し、それを使用して Firebase での認証を行う
  const handleCredentialResponseWithGoogle = async (googleIdToken: string) => {
    const credential = GoogleAuthProvider.credential(googleIdToken);

    const result = await signInWithCredential(auth, credential);
    if (result) {
      const token = await result.user.getIdToken();
      secureStoreService.save(StoreKeyEnum.TOKEN, token);
      secureStoreService.save(StoreKeyEnum.REFRESH_TOKEN, result.user.refreshToken);
      setUser(result.user);
    }
  };
  // Apple の認証応答からの ID トークンを Firebase 認証情報と交換し、それを使用して Firebase での認証を行う
  const handleCredentialResponseWithApple = async (result: UserCredential) => {
    if (result) {
      const token = await result.user.getIdToken();
      secureStoreService.save(StoreKeyEnum.TOKEN, token);
      secureStoreService.save(StoreKeyEnum.REFRESH_TOKEN, result.user.refreshToken);
      setUser(result.user);
    }
  };

  const handleRedirect = useCallback(async () => {
    const lastLoginMethod = await AsyncStorage.getValueFor('last_login_method');
    if (lastLoginMethod === 'google') {
      // google側にログインしているユーザーの情報を取得する
      const userInfo = await GoogleSignin.signInSilently();
      if (userInfo && userInfo.idToken) {
        await handleCredentialResponseWithGoogle(userInfo.idToken);
      }
    }
    if (lastLoginMethod === 'apple') {
      // TODO
    }
  }, []);

  useEffect(() => {
    (async () => {
      await handleRedirect();
    })();
  }, [handleRedirect]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const newToken = await currentUser.getIdToken(true);
        await secureStoreService.save(StoreKeyEnum.TOKEN, newToken);
        await secureStoreService.save(StoreKeyEnum.REFRESH_TOKEN, currentUser.refreshToken);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setInitialize(true);
    });
    return () => {
      unsubscribe();
    };
  }, [setUser]);

  const signInWithGoogle = async (): Promise<boolean> => {
    setGoogleAuthPending(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo?.idToken) {
        await handleCredentialResponseWithGoogle(userInfo.idToken);
      }
      await mutation.mutateAsync({});
      await AsyncStorage.save('last_login_method', 'google');
      setGoogleAuthPending(false);
      return true;
    } catch {
      setGoogleAuthPending(false);
      return false;
    }
  };

  const signInWithApple = async () => {
    if (!AppleAuthentication.isAvailableAsync || appleAuthPending) {
      return false;
    }
    setAppleAuthPending(true);
    try {
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });
      const { identityToken } = appleCredential;
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: identityToken!,
        rawNonce: nonce,
      });
      const result = await signInWithCredential(auth, credential);
      await handleCredentialResponseWithApple(result);
      await mutation.mutateAsync({});
      await AsyncStorage.save('last_login_method', 'apple');
      setAppleAuthPending(false);
      return true;
    } catch {
      setAppleAuthPending(false);
      return false;
    }
  };

  const signOut = async () => {
    try {
      const lastLoginMethod = await AsyncStorage.getValueFor('last_login_method');
      if (lastLoginMethod === 'google') {
        await GoogleSignin.signOut();
      }
      await firebaseSignOut(auth);
      await secureStoreService.deleteValueFor(StoreKeyEnum.TOKEN);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    googleAuthPending,
    appleAuthPending,
    initialize,
    signInWithGoogle,
    signInWithApple,
    signOut,
    clearUser,
  };
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authContext = useAuthProvider();
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};
