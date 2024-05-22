import { memo } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

interface Props {
  value?: string;
}

export const ErrorView = memo<Props>(({ value }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <NotoText
        style={{
          fontSize: 14,
          paddingTop: 40,
          color: Constants.colors.primitive.gray[600],
        }}>
        {`エラーが発生しました\n${value}`}
      </NotoText>
    </View>
  );
});
