import { Stack, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { CheckIconButton } from '@/components/ui/CheckIconButton';
import { Flex } from '@/components/ui/Flex';
import { Spacer } from '@/components/ui/Spacer';
import { NotoText } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { RECIPE_LIST } from '@/features/Onboarding/Recipe/constants';
import { RecipeItem } from '@/features/Recipe/Item';
import { useStore } from '@/store';

export default function OnboardingRegisterRecipesSelectPage() {
  const selectedRecipes = useStore((state) => state.onboardingSelectedRecipeList);
  const setSelectedRecipes = useStore((state) => state.setOnboardingSelectedRecipeList);
  const router = useRouter();
  const handlePress = useCallback(() => {
    router.push('/(onboarding)/(registerRecipes)/confirm');
  }, [router]);
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <View style={styles.titleWrapper}>
        <NotoText style={styles.stepper}>4/4</NotoText>
        <NotoText fw="bold" style={styles.pageTitle}>
          最後に料理を登録しましょう
        </NotoText>
        <NotoText style={{ color: Constants.colors.primitive['black alpha'][700] }}>
          登録したい料理を１つ以上選択してください
        </NotoText>
      </View>
      <View style={styles.contentBox}>
        {RECIPE_LIST.map((recipe, idx) => (
          <Pressable key={idx} onPress={() => setSelectedRecipes(recipe)}>
            <View style={styles.recipeItemWrapper}>
              <Flex style={styles.recipeBox}>
                <View style={styles.recipeInnerContent}>
                  <RecipeItem data={recipe} />
                </View>
                <CheckIconButton
                  checked={Boolean(selectedRecipes.find((item) => item.idx === recipe.idx))}
                />
              </Flex>
            </View>
          </Pressable>
        ))}
      </View>
      <Spacer />
      <View style={styles.actionButtonWrapper}>
        <Button onPress={handlePress} disabled={!selectedRecipes.length}>
          次に進む
        </Button>
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
  contentBox: { marginVertical: 20 },
  stepper: {
    fontSize: 14,
    color: Constants.colors.primitive['black alpha'][600],
  },
  pageTitle: {
    fontSize: 18,
    marginVertical: 2,
  },
  contentWrapper: { marginTop: 36 },
  recipeItemWrapper: { paddingVertical: 4, marginVertical: 2 },
  recipeBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeInnerContent: { flex: 1 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
