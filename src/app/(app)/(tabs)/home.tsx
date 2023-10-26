import { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useAuthContext } from '@/context/authProvider';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';
import { Container } from '@/components/ui/Container';

export default function HomePage() {
  const authContext = useAuthContext();
  useEffect(() => {
    (async () => {
      const token = await secureStoreService.getValueFor(StoreKeyEnum.TOKEN);
      console.log(`token2: ${JSON.stringify(token)}`);
    })();
  }, []);
  return (
   <Container>
     <View style={{flex: 1}}>
       <Text>Home</Text>
     </View>
   </Container>
  );
}
