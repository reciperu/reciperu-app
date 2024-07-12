import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { InputLabel } from '@/cores/components/InputLabel';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { usePutSpaceJoin } from '@/features/Space/apis/putSpaceJoin';

export default function OnboardingJoinBookTopPage() {
  const [code, setCode] = useState('');
  const mutation = usePutSpaceJoin({});
  const queryClient = useQueryClient();
  const handlePress = useCallback(async () => {
    if (code.length) {
      mutation.mutate(
        { token: code },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({
              queryKey: ['profile'],
            });
            router.push('/(onboarding)/(joinBook)/complete');
          },
          onSettled: () => {
            router.push('/(onboarding)/(joinBook)/complete');
          },
        }
      );
    }
  }, [code, mutation, queryClient]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <NotoText style={styles.stepper}>3/3</NotoText>
          <NotoText fw="bold" style={styles.pageTitle}>
            別のスペースに参加する
          </NotoText>
        </View>
        <NotoText style={[styles.descriptionText]}>
          パートナーから教えてもらった招待コードを入力してください
        </NotoText>
        <InputLabel required>招待コード</InputLabel>
        <TextInput value={code} onChange={(text) => setCode(text)} />
        <Spacer />
        <View style={styles.actionButtonWrapper}>
          <Button loading={mutation.isPending} disabled={!code.length} onPress={handlePress}>
            次に進む
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
    marginTop: 2,
  },
  actionButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  descriptionText: { fontSize: 16, marginVertical: 24 },
});
