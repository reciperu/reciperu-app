import { Container } from '@/components/ui/Container';
import { Constants } from '@/constants';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function WithdrawPage() {
  return (
    <Container bgColor={Constants.colors.primitive.gray[100]}>
      <Stack.Screen
        options={{
          title: '退会する',
        }}
      />
      <Text>退会する</Text>
    </Container>
  );
}
