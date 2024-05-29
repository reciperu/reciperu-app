import { memo } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

// TODO: 手順の説明を追加する

export const EmptyView = memo(() => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NotoText
        style={{
          fontSize: 14,
          paddingTop: 40,
          color: Constants.colors.primitive.gray[600],
        }}>
        まだ献立がありません
      </NotoText>
      <NotoText
        style={{
          fontSize: 14,
          color: Constants.colors.primitive.gray[600],
        }}>
        レシピから献立を作成してみましょう
      </NotoText>
    </View>
  );
});
