import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, View } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');

export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <View style={{ minHeight: windowHeight }}>
        <Stack />
      </View>
    </>
  );
}
