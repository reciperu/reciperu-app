import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '@/components/ui/Container';

export default function NotificationTopPage() {
  return (
    <Container>
      <Stack.Screen
        options={{
          presentation: 'modal',
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>NotificationTopPage</Text>
      </View>
    </Container>
  );
}
