import { useQueryClient } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useAuthContext } from '@/context/authProvider';
import { Button } from '@/cores/components/Button';
import { CheckIconButton } from '@/cores/components/CheckIconButton';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { useDeleteUser } from '@/features/User/apis/deleteUser';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

export default function WithdrawPage() {
  const [checked, setChecked] = useState(false);
  const { data } = useFetchMyProfile({});
  const mutation = useDeleteUser({});
  const authContext = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  // 退会処理
  const handleWithdraw = useCallback(() => {
    const userId = data?.id;
    if (userId !== undefined) {
      mutation.mutate(
        { id: userId },
        {
          onSuccess: async () => {
            Toast.show({
              type: 'successToast',
              text1: '退会処理が完了しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
            // ログアウト
            await authContext.signOut();
            router.push('/(auth)/signIn');
            // クエリキャッシュをクリア
            queryClient.clear();
          },
        }
      );
    }
  }, [data, mutation, router, authContext, queryClient]);
  return (
    <Container bgColor="white">
      <Stack.Screen
        options={{
          title: '退会する',
        }}
      />
      <View style={{ marginTop: 16 }}>
        <Text style={{ marginVertical: 8 }}>ご利用ありがとうございました</Text>
        <Text style={{ marginVertical: 8 }}>
          お客様が当アプリをご利用いただき、心より感謝申し上げます。退会手続きを進める前に、以下の情報をご確認ください：
        </Text>
        <Text style={{ marginVertical: 8 }}>
          {'\u2022'} 退会手続きが完了すると、すべてのデータが削除され、復元はできません。
        </Text>
        <Text style={{ marginVertical: 8 }}>
          {'\u2022'} 現在ご利用中のサービスは全てご利用いただけなくなります。
          それでも退会をご希望されますか？
        </Text>
      </View>
      <Flex style={{ alignItems: 'center', gap: 4, justifyContent: 'center', marginVertical: 32 }}>
        <Pressable style={{ paddingRight: 4 }} onPress={() => setChecked((prev) => !prev)}>
          <CheckIconButton checked={checked} size={18} />
        </Pressable>
        <NotoText
          style={{
            fontSize: 12,
          }}>
          はい、退会を希望します
        </NotoText>
      </Flex>
      <Button disabled={!checked} loading={mutation.isPending} onPress={handleWithdraw}>
        退会する
      </Button>
    </Container>
  );
}
