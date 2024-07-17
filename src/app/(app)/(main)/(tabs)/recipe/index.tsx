import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { FloatingButton } from '@/features/FloatingButton/components';
import { AllRecipeTab } from '@/features/RecipePage/components/AllRecipeTab';
import { FavoriteRecipeTab } from '@/features/RecipePage/components/FavoriteRecipeTab';
import { SearchInput } from '@/features/RecipePage/components/SearchInput';
const { height } = Dimensions.get('window');

const Tab = createMaterialTopTabNavigator();

export default function RecipePage() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    if (params.route) {
      // @ts-ignore
      navigation.navigate(params.route);
    }
  }, [params.route, navigation]);

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
      <NotoText fw="bold" style={{ fontSize: 20, paddingHorizontal: 16, paddingTop: 12 }}>
        レシピ一覧
      </NotoText>
      <View style={{ marginVertical: 12, marginHorizontal: 16 }}>
        <SearchInput search={search} setSearch={setSearch} />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: Constants.colors.primitive.pink[400] },
          tabBarStyle: { backgroundColor: 'white' },
        }}>
        <Tab.Screen
          name="AllRecipe"
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
                <Text style={{ color: focused ? Constants.colors.primitive.pink[500] : 'gray' }}>
                  すべて
                </Text>
              </Flex>
            ),
          }}>
          {() => <AllRecipeTab search={search} />}
        </Tab.Screen>
        <Tab.Screen
          name="FavoriteRecipe"
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
                <Text style={{ color: focused ? Constants.colors.primitive.pink[500] : 'gray' }}>
                  食べたい
                </Text>
              </Flex>
            ),
          }}>
          {() => <FavoriteRecipeTab search={search} />}
        </Tab.Screen>
      </Tab.Navigator>
      <View style={{ position: 'absolute', top: height - 260, right: 24 }}>
        <FloatingButton onPress={() => router.push('/recipe/create')} />
      </View>
    </View>
  );
}
