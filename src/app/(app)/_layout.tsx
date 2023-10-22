import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';

import { useAuthContext } from '@/context/authProvider';

export default function AppLayout() {
  const authContext = useAuthContext();
  return (
    <>
      <SafeAreaView>
        <Button onPress={() => authContext.signOut()}>sign out</Button>
        <Slot />
      </SafeAreaView>
    </>
  );
}
