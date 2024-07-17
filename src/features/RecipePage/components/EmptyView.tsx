import { memo } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

export const EmptyView = memo(() => {
  return (
    <View style={{ paddingVertical: 24 }}>
      <NotoText
        style={{
          fontSize: 14,
          color: Constants.colors.primitive.gray[400],
          textAlign: 'center',
        }}>
        登録されたレシピがありません
      </NotoText>
    </View>
  );
});
