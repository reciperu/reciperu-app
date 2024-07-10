import axios from 'axios';
import { Redirect, Stack, useRouter } from 'expo-router';
import { memo, useEffect } from 'react';
import { Alert } from 'react-native';

import { AUTH_ERROR_MESSAGE } from '@/constants';
import { useAuthContext } from '@/context/authProvider';
import { PageWholeLoader } from '@/cores/components/PageWholeLoader';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { UserStatus } from '@/features/User/types';
import { usePushNotificationToken } from '@/hooks/usePushNotificationToken';
import { useSignOut } from '@/hooks/useSignOut';

export default function MainLayout() {
  const authContext = useAuthContext();
  if (!authContext.user) {
    return <Redirect href="/(auth)/signIn" />;
  }
  return <MainContent />;
}

const MainContent = memo(() => {
  const authContext = useAuthContext();
  const { handleSignOut } = useSignOut();
  const { data, isLoading, error, refetch } = useFetchMyProfile({});
  const router = useRouter();
  useEffect(() => {
    if (error) {
      if (error.message === '401') {
        Alert.alert('エラー', AUTH_ERROR_MESSAGE, [
          {
            text: 'ログインする',
            onPress: () => {
              authContext.clearUser();
              router.replace('/(auth)/signIn');
            },
          },
        ]);
      } else {
        // 400系エラーの場合はsignInにリダイレクト
        if (axios.isAxiosError(error) && error.response?.status && error.response.status < 500) {
          handleSignOut();
        } else {
          console.log(`error - : ${error?.message}`);
          Alert.alert('エラー', 'エラーが発生しました。', [
            { text: 'もう一度試す', onPress: () => refetch() },
          ]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // プッシュ通知のトークン更新
  usePushNotificationToken(data?.id);

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
      <Stack.Screen
        name="recipe_webview"
        options={{
          headerShown: true,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
});
