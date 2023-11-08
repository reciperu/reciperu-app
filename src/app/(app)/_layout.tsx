import { Slot } from 'expo-router';
import { Dimensions, View } from 'react-native';

export default function AppLayout() {
  const { height } = Dimensions.get('window');
  return (
    <View style={{ minHeight: height }}>
      <Slot />
    </View>
  );
}
