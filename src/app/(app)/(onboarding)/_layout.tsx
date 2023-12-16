import { Stack } from 'expo-router';

import { Constants } from '@/constants';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {},
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
    </Stack>
  );
}
