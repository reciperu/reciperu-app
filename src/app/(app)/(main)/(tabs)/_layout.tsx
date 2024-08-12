import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { memo } from 'react';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Constants } from '@/constants';
import { AppIcon } from '@/cores/components/icons';
import { HeaderAppIcon } from '@/features/Header/AppIcon';
import { HeaderNotificationIcon } from '@/features/Header/NotificationIcon';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

const { height: windowHeight } = Dimensions.get('window');

const HeaderRightIcon = memo(() => (
  <View style={{ marginRight: 16 }}>
    <HeaderNotificationIcon />
  </View>
));

const HeaderLeftIcon = memo(() => (
  <View style={{ marginLeft: 16 }}>
    <HeaderAppIcon />
  </View>
));

export default function TabLayout() {
  const { data } = useFetchMyProfile({});
  const insets = useSafeAreaInsets();
  return (
    <View style={{ minHeight: windowHeight }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
            height: 72 + insets.bottom,
            paddingTop: 8,
            paddingBottom: 8 + insets.bottom,
          },
          tabBarInactiveTintColor: Constants.colors.primitive.gray[600],
          tabBarActiveTintColor: Constants.colors.primitive.pink[400],
          tabBarLabelStyle: { fontFamily: 'noto-sans-bold', fontSize: 10 },
          headerShadowVisible: false,
          headerTitle: '',
          // 次のバージョン
          // headerRight: () => <HeaderRightIcon />,
          headerRight: () => <></>,
          headerLeft: () => <HeaderLeftIcon />,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'ホーム',
            headerStyle: { backgroundColor: Constants.colors.primitive.pink['50'] },
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                width={32}
                height={32}
                name="home"
                color={color}
                variant={focused ? 'filled' : 'outline'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="recipe"
          options={{
            title: 'レシピ',
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                width={32}
                height={32}
                name="recipe"
                color={color}
                variant={focused ? 'filled' : 'outline'}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="menu"
          options={{
            title: '献立',
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                width={22}
                height={22}
                name="calendar"
                color={color}
                variant={focused ? 'filled' : 'outline'}
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="myPage"
          options={{
            title: 'マイページ',
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                contentFit="cover"
                source={{ uri: data?.imageUrl || '' }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: Constants.radius['full'],
                  borderWidth: focused ? 2 : undefined,
                  borderColor: focused ? '#BEE3F8' : undefined,
                }}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
