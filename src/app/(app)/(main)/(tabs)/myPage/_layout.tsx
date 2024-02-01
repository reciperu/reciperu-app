import { Stack, usePathname } from 'expo-router';
import { memo } from 'react';
import { Text, View } from 'react-native';

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
  const pathname = usePathname();
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
          headerTitle: () => {
            console.log(pathname);
            if (pathname === '/myPage/account/withdraw') {
              return <Text style={{ fontWeight: 'bold', fontSize: 16 }}>退会する</Text>;
            }
            return <Text style={{ fontWeight: 'bold', fontSize: 16 }}>アカウント設定</Text>;
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
