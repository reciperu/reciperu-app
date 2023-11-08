import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {},
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
