import { Container } from '@/components/ui/Container';
import { APP_NAME } from '@/features/Onboarding/Recipe/constants';
import { Text } from 'react-native';

export default function AboutPage() {
  return (
    <Container>
      <Text>{APP_NAME}について</Text>
    </Container>
  );
}
