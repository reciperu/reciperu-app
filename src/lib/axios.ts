import { EXPO_PUBLIC_API_URL } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Axios from 'axios';
import { router } from 'expo-router';
import qs, { parse } from 'qs';

import { API_TIMEOUT, AUTH_ERROR_MESSAGE } from '@/constants';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

const config = {
  timeout: API_TIMEOUT,
  baseURL: EXPO_PUBLIC_API_URL,
  paramsSerializer: {
    encode: parse as any,
    serialize: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
  retry: false,
};

const client = Axios.create(config);

client.interceptors.request.use(
  async (config) => {
    if (!config.headers['token']) {
      const token = await secureStoreService.getValueFor(StoreKeyEnum.TOKEN);
      if (!token) {
        // note: 今のところ認証必須
        router.replace('/(auth)/sign-in');
        return Promise.reject(AUTH_ERROR_MESSAGE);
      } else {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // リトライ処理
      if (!error.config.retry) {
        // tokenの更新
        const res = await GoogleSignin.getTokens();
        await secureStoreService.save(StoreKeyEnum.TOKEN, res.idToken);
        error.config.retry = true;
        return client.request(error.config);
      } else {
        router.replace('/(auth)/sign-in');
        return Promise.reject(AUTH_ERROR_MESSAGE);
      }
    } else {
      router.replace('/(auth)/sign-in');
      return Promise.reject(error);
    }
  }
);

export { client };
