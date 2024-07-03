import { Container } from '@/cores/components/Container';
import { NotoText } from '@/cores/components/Text';
import { MenuList } from '@/features/Menu/components/MenuList';

export default function MenuPage() {
  return (
    <Container>
      <NotoText fw="bold" style={{ fontSize: 20, paddingTop: 12 }}>
        献立
      </NotoText>
      <MenuList />
    </Container>
  );
}
