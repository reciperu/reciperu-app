import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { NotoText } from '@/components/ui/Text';
import { TextInput } from '@/components/ui/TextInput';
import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { usePutRecipeBook } from '@/features/Book/api/putRecipeBook';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

const getDefaultTitle = (name: string) => `${name}さんのスペース`;

export default function OnboardingCreateBookTitlePage() {
  const { data } = useFetchMyProfile();
  const { putRecipeBook } = usePutRecipeBook(data?.recipeBookOwnerId || '');
  const router = useRouter();
  const [bookName, setBookName] = useState(getDefaultTitle(data?.name || ''));
  // TODO: 作成
  const handlePress = useCallback(() => {
    // タイトルがデフォルトと異なる場合は更新
    if (bookName !== getDefaultTitle(data?.name || '')) {
      putRecipeBook(bookName);
    }
    router.push('/(onboarding)/(registerRecipes)/select');
  }, [bookName, data?.name, putRecipeBook, router]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>3/4</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            スペースに名前をつけましょう
          </NotoText>
        </View>
        <TextInput
          value={bookName}
          onChange={(text) => setBookName(text)}
          maxLength={Validation.SPACE_NAME.MAX_LENGTH.VALUE}
        />
        <Spacer />
        <Button disabled={bookName.trim() === ''} onPress={handlePress}>
          次に進む
        </Button>
        <Button variant="others" onPress={() => router.back()}>
          戻る
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 50 },
  titleWrapper: {
    marginTop: 8,
    marginBottom: 12,
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
  bookWrapper: { display: 'flex', alignItems: 'center', marginTop: 32 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
