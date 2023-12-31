import { Redirect, Tabs, router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, Dimensions, TouchableHighlight, View } from 'react-native';

import { PageWholeLoader } from '@/components/ui/PageWholeLoader';
import { Text } from '@/components/ui/Text';
import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { useFetchMyProfile } from '@/features/Users/apis/getMyProfile';
import { UserStatus } from '@/features/Users/types';

export default function TabLayout() {
  const authContext = useAuthContext();
  const windowHeight = Dimensions.get('window').height;
  const { data, isLoading, error, mutate } = useFetchMyProfile();
  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        Alert.alert('エラー', 'ログインが必要です', [
          {
            text: 'ログインする',
            onPress: () => {
              authContext.clearUser();
              router.replace('/(auth)/sign-in');
            },
          },
        ]);
      } else {
        Alert.alert('エラー', 'エラーが発生しました。', [
          { text: 'もう一度試す', onPress: () => mutate() },
        ]);
      }
    }
  }, [error]);
  // 取得中
  if (isLoading) {
    return <PageWholeLoader />;
  }
  // オンボーディングにリダイレクト
  if (data?.activeStatus === UserStatus.ONBOARDING) {
    return <Redirect href="/(onboarding)" />;
  }
  // エラーの場合
  if (error) {
    return <></>;
  }
  return (
    <View style={{ minHeight: windowHeight }}>
      <Tabs
        screenOptions={{
          // headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
          },
          tabBarInactiveTintColor: Constants.colors.primitive.gray[600],
          tabBarActiveTintColor: Constants.colors.primitive.pink[400],
          tabBarLabelStyle: { fontFamily: 'LINE-bold', fontSize: 10 },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'ホーム',
            headerRight: () => (
              <TouchableHighlight onPress={() => authContext.signOut()}>
                <Text style={{ color: 'red' }}>サインアウト</Text>
              </TouchableHighlight>
            ),
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
            headerRight: () => (
              <TouchableHighlight onPress={() => authContext.signOut()}>
                <Text style={{ color: 'red' }}>サインアウト</Text>
              </TouchableHighlight>
            ),
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
            headerRight: () => (
              <TouchableHighlight onPress={() => authContext.signOut()}>
                <Text style={{ color: 'red' }}>サインアウト</Text>
              </TouchableHighlight>
            ),
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
            headerRight: () => (
              <TouchableHighlight onPress={() => authContext.signOut()}>
                <Text style={{ color: 'red' }}>サインアウト</Text>
              </TouchableHighlight>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
