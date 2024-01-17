import { Slot } from 'expo-router';
import { Dimensions, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function AppLayout() {
  return (
    <View style={{ minHeight: height }}>
      <Slot />
    </View>
  );
}
