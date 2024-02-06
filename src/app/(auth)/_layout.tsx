import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, View } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <View style={{ minHeight: windowHeight }}>
        <Stack>
          <Stack.Screen name="signIn" />
          <Stack.Screen
            name="terms"
            options={{
              title: '利用規約',
              headerTintColor: '#000000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerBackVisible: true,
              headerShadowVisible: false,
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="privacyPolicy"
            options={{
              title: 'プライバシーポリシー',
              headerTintColor: '#000000',

              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShadowVisible: false,
              presentation: 'modal',
            }}
          />
        </Stack>
      </View>
    </>
  );
}
