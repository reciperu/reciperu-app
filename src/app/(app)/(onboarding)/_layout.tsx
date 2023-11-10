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
      }}
    />
  );
}
