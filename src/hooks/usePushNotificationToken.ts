import * as Application from 'expo-application';
import Constants from 'expo-constants';
import Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect } from 'react';
import { AppState } from 'react-native';

import { usePutToken } from '@/features/User/apis/putToken';

type UsePushNotificationToken = (userId?: string) => void;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const usePushNotificationToken: UsePushNotificationToken = (userId) => {
  const mutation = usePutToken({});
  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return;
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        console.error('Project ID not found');
      }
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;

      // デバイス固有の識別子を取得
      // NOTE: androidも含める際はApplication.androidIdを使用
      const deviceId = await Application.getIosIdForVendorAsync();

      if (deviceId) {
        // サーバーにトークンを送信
        mutation.mutate({
          deviceId,
          token,
        });
      }
    }
    // NOTE: v1以降で使用
    // if (Platform.OS === 'android') {
    //   Notifications.setNotificationChannelAsync('default', {
    //     name: 'default',
    //     importance: Notifications.AndroidImportance.MAX,
    //     vibrationPattern: [0, 250, 250, 250],
    //     lightColor: '#FF231F7C',
    //   });
    // }
  }, [mutation]);
  useEffect(() => {
    if (userId) {
      registerForPushNotificationsAsync();
    }

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active' && userId) {
        registerForPushNotificationsAsync();
      }
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};
