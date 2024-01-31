import * as SecureStore from 'expo-secure-store';

export enum StoreKeyEnum {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}

/**
 * 値の保存
 * @param key キー
 * @param value 値
 */
const save = async (key: StoreKeyEnum, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

/**
 * 値の削除
 * @param key キー
 */
const deleteValueFor = async (key: StoreKeyEnum) => {
  await SecureStore.deleteItemAsync(key);
};

/**
 * 値の取得
 * @param key キー
 * @returns {string | null}
 */
const getValueFor = async (key: StoreKeyEnum) => {
  const result = await SecureStore.getItemAsync(key);
  return result;
};

export default { save, getValueFor, deleteValueFor };
