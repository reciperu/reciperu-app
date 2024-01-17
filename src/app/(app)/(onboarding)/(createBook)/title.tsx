import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { NotoText } from '@/components/ui/Text';
import { TextInput } from '@/components/ui/TextInput';
import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { Book } from '@/features/Book';
import { useFetchMyProfile } from '@/features/Users/apis/getMyProfile';

export default function OnboardingCreateBookTitlePage() {
  const { data } = useFetchMyProfile();
  const router = useRouter();
  const [bookName, setBookName] = useState(`${data?.name}さんの料理本`);
  // TODO: 作成
  const handlePress = useCallback(() => {
    router.push('/(onboarding)/(registerRecipes)/select');
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>3/4</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            料理本に名前をつけましょう
          </NotoText>
        </View>
        <View style={styles.bookWrapper}>
          <Book name={bookName} icon={data?.imageUrl || ''} />
        </View>
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <TextInput
            value={bookName}
            onChange={(text) => setBookName(text)}
            maxLength={Validation.BOOK_NAME.MAX_LENGTH.VALUE}
          />
          <Button disabled={bookName.trim() === ''} onPress={handlePress}>
            次に進む
          </Button>
          <Button variant="others" onPress={() => router.back()}>
            戻る
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 50 },
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
  bookWrapper: { display: 'flex', alignItems: 'center', marginTop: 32 },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
});
