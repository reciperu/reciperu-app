import { Stack } from 'expo-router';
import { memo } from 'react';
import { View } from 'react-native';

import { HeaderNotificationIcon } from '@/features/Header/NotificationIcon';

const HeaderRightIcon = memo(() => (
  <View style={{ marginTop: 10 }}>
    <HeaderNotificationIcon />
  </View>
));

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'アカウント設定',
        }}
      />
      <Stack.Screen
        name="withdraw"
        options={{
          title: '退会する',
        }}
      />
    </Stack>
  );
}
