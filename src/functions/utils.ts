import * as Linking from 'expo-linking';

export const noop = () => {};

export const getRandomNumber = (count: number) => {
  return Math.floor(Math.random() * count);
};

export const openURL = (url: string) => {
  Linking.openURL(url);
};

export const openSettingApp = () => {
  Linking.openSettings();
};
