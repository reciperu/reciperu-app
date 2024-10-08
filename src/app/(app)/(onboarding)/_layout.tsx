import axios from 'axios';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { PageWholeLoader } from '@/cores/components/PageWholeLoader';
import { HeaderAppIcon } from '@/features/Header/AppIcon';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { UserStatus } from '@/features/User/types';
import { usePushNotificationToken } from '@/hooks/usePushNotificationToken';
import { useSignOut } from '@/hooks/useSignOut';

export default function OnboardingLayout() {
  const { handleSignOut } = useSignOut();
  const { data, error } = useFetchMyProfile({});
  useEffect(() => {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      if (statusCode === 403 || statusCode === 401) {
        handleSignOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // プッシュ通知のトークン更新
  usePushNotificationToken(data?.id);

  if (!data) return <PageWholeLoader />;
  if (data?.activeStatus === UserStatus.JOINED_SPACE) {
    return <Redirect href="/(main)/(tabs)/home" />;
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: {},
        headerTitle: () => <HeaderAppIcon />,
        headerTintColor: Constants.colors.primitive.pink[400],
      }}>
      <Stack.Screen
        name="createSpace"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      {/* createBook */}
      <Stack.Screen
        name="(createBook)/title"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      {/* joinBook */}
      <Stack.Screen
        name="(joinBook)/complete"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(joinBook)/description"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(joinBook)/readQR"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      {/* registerRecipes */}
      <Stack.Screen
        name="(registerRecipes)/select"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(registerRecipes)/confirm"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(registerRecipes)/edit/[slug]"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(registerRecipes)/complete"
        options={{
          title: '',
          headerLeft: () => <View />,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
