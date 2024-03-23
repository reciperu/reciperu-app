import { NotoText } from '@/cores/components/Text';
import { memo } from 'react';
import { View } from 'react-native';

interface Props {
  search: string;
}

export const FavoriteRecipeTab = memo<Props>(({ search }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <NotoText>Home</NotoText>
    </View>
  );
});
