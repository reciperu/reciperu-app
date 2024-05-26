import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'アカウント設定',
        }}
      />
      <Stack.Screen
        name="withdraw"
        options={{
          title: '退会する',
        }}
      />
    </Stack>
  );
}
