import { useAuthContext } from '@/context/authProvider';
// import { getIdToken } from 'firebase/auth';
import { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

export default function HomePage() {
  const authContext = useAuthContext();
  //   useEffect(() => {
  //     (async () => {
  //         if (authContext.user) {
  //             const token = await getIdToken(authContext.user)
  //             console.log(`token: ${token}`)
  //         }
  //     })()
  //   }, [])
  useEffect(() => {
    (async () => {
      const token = await secureStoreService.getValueFor(StoreKeyEnum.TOKEN);
      console.log(`token2: ${JSON.stringify(token)}`);
    })();
  }, []);
  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
