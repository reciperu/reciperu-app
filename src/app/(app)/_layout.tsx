import { Redirect, Slot } from 'expo-router';
import { Dimensions, View } from 'react-native';

import { useAuthContext } from '@/context/authProvider';

const { height } = Dimensions.get('window');

export default function AppLayout() {
  const authContext = useAuthContext();
  if (!authContext.user) {
    return <Redirect href="/(auth)/signIn" />;
  }
  return (
    <View style={{ minHeight: height }}>
      <Slot />
    </View>
  );
}
