import { Redirect, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';

import { PageWholeLoader } from '@/components/ui/PageWholeLoader';
import { AUTH_ERROR_MESSAGE } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { useFetchMyProfile } from '@/features/Users/apis/getMyProfile';
import { UserStatus } from '@/features/Users/types';

export default function MainLayout() {
  const authContext = useAuthContext();
  const { data, isLoading, error, mutate } = useFetchMyProfile();
  const router = useRouter();
  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        Alert.alert('エラー', AUTH_ERROR_MESSAGE, [
          {
            text: 'ログインする',
            onPress: () => {
              authContext.clearUser();
              router.replace('/(auth)/sign-in');
            },
          },
        ]);
      } else {
        Alert.alert('エラー', 'エラーが発生しました。', [
          { text: 'もう一度試す', onPress: () => mutate() },
        ]);
      }
    }
  }, [error]);
  // 取得中
  if (isLoading) {
    return <PageWholeLoader />;
  }
  // オンボーディングにリダイレクト
  if (data?.activeStatus === UserStatus.ONBOARDING) {
    return <Redirect href="/(onboarding)" />;
  }
  // エラーの場合
  if (error) {
    return <></>;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="notification"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
