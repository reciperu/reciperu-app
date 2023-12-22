import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Flex } from '@/components/ui/Flex';
import { Spacer } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';
import { RecipeItem } from '@/features/Recipe/Item';
import { usePostRecipeBulk } from '@/features/Recipe/apis/postRecipeBulk';
import { useStore } from '@/store';

export default function OnboardingRegisterRecipesConfirmPage() {
  const selectedRecipes = useStore((state) => state.onboardingSelectedRecipeList);
  const [pending, setPending] = useState(false);
  const { height } = useWindowDimensions();
  const { postRecipeBulkData } = usePostRecipeBulk();
  const router = useRouter();
  const handlePress = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      await postRecipeBulkData(selectedRecipes);
      router.push('/(onboarding)/(registerRecipes)/complete');
    } catch (err) {
      console.log(err);
    }
    setPending(false);
  }, [router, pending, selectedRecipes, postRecipeBulkData]);
  const handleEdit = useCallback(
    (idx: number) => {
      if (pending) return;
      router.push(`/(onboarding)/(registerRecipes)/edit/${idx}`);
    },
    [router, pending]
  );
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
          {selectedRecipes.map((recipe) => (
            <View style={{ paddingVertical: 4, marginVertical: 2 }} key={recipe.idx}>
              <Flex
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flex: 1 }}>
                  <RecipeItem data={recipe} />
                </View>
                <Pressable onPress={() => handleEdit(recipe.idx)}>
                  <View
                    style={[styles.editButtonWrapper, pending && styles.disabledEditButtonWrapper]}>
                    <Text fw="bold" style={styles.editButtonText}>
                      編集
                    </Text>
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
