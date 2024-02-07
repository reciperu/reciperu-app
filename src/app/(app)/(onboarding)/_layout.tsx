import { Redirect, Stack } from 'expo-router';
import { View } from 'react-native';

import { HeaderAppIcon } from '@/components/ui/Header/AppIcon';
import { Constants } from '@/constants';
import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { UserStatus } from '@/features/User/types';

export default function OnboardingLayout() {
  const { data } = useFetchMyProfile();
  if (!data) return <></>;
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
