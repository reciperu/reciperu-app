import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Spacer } from '@/components/ui/Spacer';
import { NotoText } from '@/components/ui/Text';
import { TextInput } from '@/components/ui/TextInput';
import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { usePutSpace } from '@/features/Space/apis/putSpace';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

const getDefaultTitle = (name: string) => `${name}さんのスペース`;

export default function OnboardingCreateBookTitlePage() {
  const { data } = useFetchMyProfile();
  const { putSpace } = usePutSpace(data?.spaceId || '');
  const router = useRouter();
  const [spaceName, setSpaceName] = useState(getDefaultTitle(data?.name || ''));

  const handlePress = useCallback(async () => {
    try {
      await putSpace(spaceName);
      router.push('/(onboarding)/(registerRecipes)/select');
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }, [spaceName, putSpace, router]);
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
          value={spaceName}
          onChange={(text) => setSpaceName(text)}
          maxLength={Validation.SPACE_NAME.MAX_LENGTH.VALUE}
        />
        <Spacer />
        <Button disabled={spaceName.trim() === ''} onPress={handlePress}>
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
