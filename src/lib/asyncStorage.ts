import AsyncStorage from '@react-native-async-storage/async-storage';

type KEY_MAP = 'last_login_method';

const save = async (key: KEY_MAP, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const deleteValueFor = async (key: KEY_MAP) => {
  await AsyncStorage.removeItem(key);
};

const getValueFor = async (key: KEY_MAP) => {
  const result = await AsyncStorage.getItem(key);
  if (typeof result === 'string') {
    return result;
  } else if (result) {
    return JSON.parse(result);
  }
  return null;
};

export default { save, getValueFor, deleteValueFor };
