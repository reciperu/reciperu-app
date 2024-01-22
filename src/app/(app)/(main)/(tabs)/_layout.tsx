import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { Dimensions, TouchableHighlight, View } from 'react-native';

import { HeaderAppIcon } from '@/components/ui/Header/AppIcon';
import { HeaderNotificationIcon } from '@/components/ui/Header/NotificationIcon';
import { NotoText } from '@/components/ui/Text';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { useFetchMyProfile } from '@/features/Users/apis/getMyProfile';

const { height: windowHeight } = Dimensions.get('window');

export default function TabLayout() {
  const authContext = useAuthContext();
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
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'ホーム',
            headerTitle: '',
            headerRight: () => <HeaderNotificationIcon />,
            headerLeft: () => <HeaderAppIcon />,
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
            title: '料理',
            headerTitle: '',
            headerRight: () => <HeaderNotificationIcon />,
            headerLeft: () => <HeaderAppIcon />,
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
            headerTitle: '',
            headerRight: () => <HeaderNotificationIcon />,
            headerLeft: () => <HeaderAppIcon />,
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
            headerTitle: '',
            headerRight: () => <HeaderNotificationIcon />,
            headerLeft: () => <HeaderAppIcon />,
            tabBarIcon: ({ color, focused }) => (
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
