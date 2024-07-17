import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { Button } from '@/cores/components/Button';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { usePutSpace } from '@/features/Space/apis/putSpace';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

const getDefaultTitle = (name: string) => `${name}のスペース`;

export default function OnboardingCreateBookTitlePage() {
  const queryClient = useQueryClient();
  const { data } = useFetchMyProfile({});
  const mutation = usePutSpace({});
  const router = useRouter();
  const [spaceName, setSpaceName] = useState(getDefaultTitle(data?.name || ''));

  const handlePress = useCallback(async () => {
    try {
      mutation.mutate(
        {
          id: data?.spaceId || '',
          data: {
            name: spaceName,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['spaces'],
            });
            router.push('/(onboarding)/(registerRecipes)/select');
          },
        }
      );
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }, [spaceName, mutation, router, data, queryClient]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>3/4</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            あなたのスペースの名前を教えてください
          </NotoText>
        </View>
        <TextInput
          value={spaceName}
          onChange={(text) => setSpaceName(text)}
          maxLength={Validation.SPACE_NAME.MAX_LENGTH.VALUE}
        />
        <Spacer />
        <View style={{ marginBottom: 12 }}>
          <Button
            disabled={spaceName.trim() === ''}
            loading={mutation.isPending}
            onPress={handlePress}>
            次に進む
          </Button>
        </View>
        <Button variant="others" disabled={mutation.isPending} onPress={() => router.back()}>
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
