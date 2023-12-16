import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { RECIPE_LIST } from '@/features/Onboarding/Recipe/constants';
import { RecipeItem } from '@/features/Recipe/Item';
import { useStore } from '@/store';

export default function OnboardingRegisterRecipesConfirmPage() {
  const selectedRecipes = useStore((state) => state.onboardingSelectedRecipeIdxList);
  const { height } = useWindowDimensions();
  const router = useRouter();
  const selectedRecipeList = useMemo(
    () => selectedRecipes.map((idx) => RECIPE_LIST[idx]),
    [selectedRecipes]
  );
  // TODO: 作成
  const handlePress = useCallback(() => {
    router.push('/(onboarding)/(registerRecipes)/confirm');
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={{ minHeight: height - 144 }}>
        <View style={styles.titleWrapper}>
          <Text style={styles.stepper}>4/4</Text>
          <Text fw="bold" style={styles.pageTitle}>
            以下の料理を登録します
          </Text>
          <Text>追加情報があれば入力することができます</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          {selectedRecipeList.map((recipe, idx) => (
            <View style={{ paddingVertical: 4, marginVertical: 2 }} key={idx}>
              <Flex
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 1 }}>
                  <RecipeItem data={recipe} />
                </View>
                <Pressable onPress={() => router.push('/(onboarding)/(registerRecipes)/edit/123')}>
                  <Text>press</Text>
                </Pressable>
              </Flex>
            </View>
          ))}
        </View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={handlePress} disabled={!selectedRecipes.length}>
            次に進む
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 50,
    display: 'flex',
    backgroundColor: 'white',
  },
  titleWrapper: {
    marginTop: 8,
  },
  stepper: {
    fontSize: 14,
    color: Constants.colors.primitive['black alpha'][600],
  },
  pageTitle: {
    fontSize: 18,
    marginVertical: 2,
  },
  contentWrapper: { marginTop: 36 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
