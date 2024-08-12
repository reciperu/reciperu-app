import Axios from 'axios';
import qs, { parse } from 'qs';
import Toast from 'react-native-toast-message';

import { API_TIMEOUT, AUTH_ERROR_MESSAGE } from '@/constants';
import { convertErrorMessage } from '@/functions/errorMessage';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

const config = {
  timeout: API_TIMEOUT,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  paramsSerializer: {
    encode: parse as any,
    serialize: (params: Record<string, any>) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
  retry: false,
};

const client = Axios.create(config);

client.interceptors.request.use(
  async (config) => {
    if (!config.headers['Authorization']) {
      const token = await secureStoreService.getValueFor(StoreKeyEnum.TOKEN);
      if (!token) {
        // note: 今のところ認証必須
        return Promise.reject(new Error(AUTH_ERROR_MESSAGE));
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
    // console.log(JSON.stringify(response.data));
    return response.data;
  },
  async (error) => {
    // console.log(JSON.stringify(error.response));
    if (error.response?.status === 401) {
      // リトライ処理
      if (!error.config.retry) {
        // tokenの更新
        try {
          const refreshToken = await secureStoreService.getValueFor(StoreKeyEnum.REFRESH_TOKEN);

          const response = await fetch(
            `https://securetoken.googleapis.com/v1/token?key=${process.env.EXPO_PUBLIC_API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              },
              body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
            }
          );
          const json = await response.json();
          if (json?.stsTokenManager?.accessToken) {
            await secureStoreService.save(StoreKeyEnum.TOKEN, json.stsTokenManager.accessToken);
          }
          if (json?.stsTokenManager?.refreshToken) {
            await secureStoreService.save(
              StoreKeyEnum.REFRESH_TOKEN,
              json.stsTokenManager.refreshToken
            );
          }
        } catch (error) {
          console.log(error);
        }
        error.config.retry = true;
        return client.request(error.config);
      } else {
        return Promise.reject(error);
      }
    } else {
      const message = error.response?.data?.message || error.message;
      if (message?.length) {
        Toast.show({
          type: 'errorToast',
          text1: 'エラーが発生しました',
          text2: convertErrorMessage(error.response?.data?.message || error.message),
          visibilityTime: 3000,
          autoHide: true,
          position: 'bottom',
        });
      }
    }
    return Promise.reject(error);
  }
);

export { client };
