import { Stack, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Constants, ONBOARDING_RECIPE_LIST } from '@/constants';
import { Button } from '@/cores/components/Button';
import { CheckIconButton } from '@/cores/components/CheckIconButton';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { RecipeItem } from '@/features/Recipe/components/RecipeItem';
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
          最後にスペースに料理を登録しましょう
        </NotoText>
        <NotoText style={{ color: Constants.colors.primitive['black alpha'][700] }}>
          登録したい料理を１つ以上選択してください
        </NotoText>
      </View>
      <View style={styles.contentBox}>
        {ONBOARDING_RECIPE_LIST.map((recipe, idx) => (
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
  recipeItemWrapper: { paddingVertical: 4, marginVertical: 4 },
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
