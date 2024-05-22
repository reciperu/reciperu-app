import { memo } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

export const EmptyView = memo(() => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NotoText
        style={{
          fontSize: 14,
          paddingTop: 40,
          color: Constants.colors.primitive.gray[600],
        }}>
        登録されたレシピがありません
      </NotoText>
    </View>
  );
});
