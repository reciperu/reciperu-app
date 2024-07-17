import { memo } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

interface Props {
  value?: string;
}

export const ErrorView = memo<Props>(({ value }) => {
  return (
    <View style={{ paddingVertical: 24 }}>
      <NotoText
        style={{
          fontSize: 14,
          color: Constants.colors.primitive.gray[400],
          textAlign: 'center',
        }}>
        {`エラーが発生しました\n${value}`}
      </NotoText>
    </View>
  );
});
