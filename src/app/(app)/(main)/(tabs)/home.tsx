import { View } from 'react-native';

import { Container } from '@/components/ui/Container';
import { SharingPromotionCard } from '@/components/feature/Promotion/Sharing';

export default function HomePage() {
  return (
    <Container>
      <View style={{ flex: 1 }}>
        {
          // TODO: スペースが一人の場合
        }
        <View style={{ marginTop: 24 }}>
          <SharingPromotionCard />
        </View>
      </View>
    </Container>
  );
}
