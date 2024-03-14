import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Constants } from '@/constants';
import { Container } from '@/features/chore/Container';

export default function WithdrawPage() {
  return (
    <Container bgColor={Constants.colors.primitive.pink[50]}>
      <Stack.Screen
        options={{
          title: '退会する',
        }}
      />
      <Text>退会する</Text>
    </Container>
  );
}
