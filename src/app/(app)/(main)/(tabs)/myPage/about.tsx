import { Container } from '@/components/ui/Container';
import { Constants } from '@/constants';
import { APP_NAME } from '@/features/Onboarding/Recipe/constants';
import * as ExpoConstants from 'expo-constants';
import { Text } from 'react-native';

export default function AboutPage() {
  // アプリのバージョンを取得
  const appVersion = (ExpoConstants.default as any).manifest.version;
  return (
    <Container bgColor={Constants.colors.primitive.gray[100]}>
      <Text>{APP_NAME}について</Text>
      <Text
        style={{
          color: Constants.colors.primitive.gray[400],
          textAlign: 'center',
          marginTop: 20,
          marginBottom: 40,
        }}>
        v{appVersion}
      </Text>
    </Container>
  );
}
