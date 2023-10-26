import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, View } from 'react-native';

export default function AuthLayout() {
  const windowHeight = Dimensions.get('window').height;
  return (
    <>
      <StatusBar style="dark" />
      <View style={{ minHeight: windowHeight }}>
        <Stack />
      </View>
    </>
  );
}
