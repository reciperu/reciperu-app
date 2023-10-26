import { Tabs } from 'expo-router';
import { Dimensions, TouchableHighlight, View } from 'react-native';

import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { useAuthContext } from '@/context/authProvider';

export default function TabLayout() {
  const authContext = useAuthContext();
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{ minHeight: windowHeight }}>
      <Tabs
        screenOptions={{
          // headerShown: false,
          // tabBarStyle: {
          //   backgroundColor: colors.$background2,
          //   borderTopWidth: 0,
          // },
          tabBarActiveTintColor: Constants.colors.primitive.pink[400],
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
