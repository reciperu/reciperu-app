import { Stack } from 'expo-router';
import { memo } from 'react';
import { View } from 'react-native';

import { HeaderAppIcon } from '@/components/ui/Header/AppIcon';
import { HeaderNotificationIcon } from '@/components/ui/Header/NotificationIcon';
import { Constants } from '@/constants';
import { APP_NAME } from '@/features/Onboarding/Recipe/constants';

const HeaderRightIcon = memo(() => (
  <View style={{ marginTop: 10 }}>
    <HeaderNotificationIcon />
  </View>
));

const HeaderLeftIcon = memo(() => (
  <View style={{ marginTop: 10 }}>
    <HeaderAppIcon />
  </View>
));

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => <HeaderRightIcon />,
        headerLeft: () => <HeaderLeftIcon />,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          paddingTop: 6,
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: `${APP_NAME}について`,
          headerLeft: () => null,
          headerBackVisible: true,
          headerTintColor: Constants.colors.primitive.pink[400],
          headerTitleStyle: {
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: 'アカウント設定',
          headerLeft: () => null,
          headerBackVisible: true,
          headerTintColor: Constants.colors.primitive.pink[400],
          headerTitleStyle: {
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          title: 'お問い合わせ',
          headerLeft: () => null,
          headerBackVisible: true,
          headerTintColor: Constants.colors.primitive.pink[400],
          headerTitleStyle: {
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="license"
        options={{
          title: 'ライセンス',
          headerLeft: () => null,
          headerBackVisible: true,
          headerTintColor: Constants.colors.primitive.pink[400],
          headerTitleStyle: {
            color: 'black',
          },
        }}
      />
    </Stack>
  );
}
