import { Text, View } from 'react-native';

import { NotoText } from '@/cores/components/Text';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Constants } from '@/constants';
import { AppIcon } from '@/cores/components/icons';
import { Flex } from '@/cores/components/Flex';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <NotoText>Home</NotoText>
  </View>
);
const SettingsScreen = () => <NotoText>SettingsScreen</NotoText>;

export default function RecipePage() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <NotoText fw="bold" style={{ fontSize: 20, paddingHorizontal: 16, paddingTop: 12 }}>
        レシピ一覧
      </NotoText>
      {/* <View style={{ marginVertical: 8 }}>検索</View> */}
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Constants.colors.primitive.pink[400] },
          tabBarStyle: { backgroundColor: 'white' },
        }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: ({ focused }) => (
              <Flex style={{ alignItems: 'center', gap: 6 }}>
                <AppIcon
                  name="list"
                  width={14}
                  height={14}
                  color={
                    focused
                      ? Constants.colors.primitive.pink[400]
                      : Constants.colors.primitive.gray[400]
                  }
                />
                <Text style={{ color: focused ? 'black' : 'gray' }}>すべて</Text>
              </Flex>
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Settings"
          options={{
            tabBarLabel: ({ focused }) => (
              <Flex style={{ alignItems: 'center', gap: 6 }}>
                <AppIcon
                  name="bookmark"
                  width={14}
                  height={14}
                  color={
                    focused
                      ? Constants.colors.primitive.pink[400]
                      : Constants.colors.primitive.gray[400]
                  }
                />
                <Text style={{ color: focused ? 'black' : 'gray' }}>食べたい</Text>
              </Flex>
            ),
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </View>
  );
}
