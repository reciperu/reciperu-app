import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { memo } from 'react';
import { Dimensions, View } from 'react-native';

import { HeaderAppIcon } from '@/components/ui/Header/AppIcon';
import { HeaderNotificationIcon } from '@/components/ui/Header/NotificationIcon';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
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
  const { data } = useFetchMyProfile();
  return (
    <View style={{ minHeight: windowHeight }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0,
          },
          tabBarInactiveTintColor: Constants.colors.primitive.gray[600],
          tabBarActiveTintColor: Constants.colors.primitive.pink[400],
          tabBarLabelStyle: { fontFamily: 'noto-sans-bold', fontSize: 10 },
          headerShadowVisible: false,
          headerTitle: '',
          headerRight: () => <HeaderRightIcon />,
          headerLeft: () => <HeaderLeftIcon />,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'ホーム',
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                width={28}
                height={28}
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
            // headerRight: () => (
            //   <TouchableHighlight onPress={() => authContext.signOut()}>
            //     <NotoText style={{ color: 'red' }}>サインアウト</NotoText>
            //   </TouchableHighlight>
            // ),
            tabBarIcon: ({ color, focused }) => (
              <AppIcon
                width={28}
                height={28}
                name="recipe"
                color={color}
                variant={focused ? 'filled' : 'outline'}
              />
            ),
          }}
        />
        <Tabs.Screen
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
        />
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
                  width: 24,
                  height: 24,
                  borderRadius: Constants.radius['full'],
                  borderWidth: focused ? 2 : undefined,
                  borderColor: focused ? '#ED64A660' : undefined,
                }}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}