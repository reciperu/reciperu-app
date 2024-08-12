import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { usePostRecipeBulk } from '@/features/Recipe/apis/postRecipeBulk';
import { RecipeItem } from '@/features/Recipe/components/RecipeItem';
import { useStore } from '@/store';

export default function OnboardingRegisterRecipesConfirmPage() {
  const queryClient = useQueryClient();
  const selectedRecipes = useStore((state) => state.onboardingSelectedRecipeList);
  const [pending, setPending] = useState(false);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const mutation = usePostRecipeBulk({});
  const router = useRouter();
  const handlePress = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      mutation.mutate(selectedRecipes, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['recipes'],
          });
          router.push('/(onboarding)/(registerRecipes)/complete');
        },
        onSettled: () => setPending(false),
      });
    } catch (err) {
      console.log(err);
    }
  }, [router, pending, selectedRecipes, mutation, queryClient]);
  const handleEdit = useCallback(
    (idx: number) => {
      if (pending) return;
      router.push(`/(onboarding)/(registerRecipes)/edit/${idx}`);
    },
    [router, pending]
  );
  return (
    <ScrollView style={styles.container}>
      <View style={{ minHeight: height - insets.bottom - insets.top - 44 }}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>4/4</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            以下の料理を登録します
          </NotoText>
          <NotoText style={{ color: Constants.colors.primitive['black alpha'][700], marginTop: 4 }}>
            レシピ情報は後から変更することができます
          </NotoText>
        </View>
        <View style={{ marginVertical: 20, flex: 1 }}>
          {selectedRecipes.map((recipe) => (
            <View style={{ paddingVertical: 4, marginVertical: 2 }} key={recipe.idx}>
              <Flex
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 1 }}>
                  <RecipeItem data={recipe} />
                </View>
                <Pressable onPress={() => handleEdit(recipe.idx)}>
                  <View
                    style={[styles.editButtonWrapper, pending && styles.disabledEditButtonWrapper]}>
                    <NotoText fw="bold" style={styles.editButtonText}>
                      編集
                    </NotoText>
                  </View>
                </Pressable>
              </Flex>
            </View>
          ))}
        </View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button onPress={handlePress} loading={pending} disabled={!selectedRecipes.length}>
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
    paddingBottom: 24,
  },
  editButtonWrapper: {
    backgroundColor: Constants.colors.primitive.pink[400],
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: Constants.radius['3xl'],
  },
  disabledEditButtonWrapper: {
    opacity: 0.5,
  },
  editButtonText: {
    color: Constants.colors.primitive.white['undefined'],
    fontSize: 12,
  },
});
