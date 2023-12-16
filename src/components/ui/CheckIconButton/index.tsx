import { memo } from 'react';
import { View } from 'react-native';

import { AppIcon } from '@/components/ui/icons';
import { Constants } from '@/constants';

interface Props {
  checked: boolean;
}

export const CheckIconButton = memo<Props>(({ checked }) => {
  if (checked) {
    return (
      <AppIcon
        name="check-mark"
        width={20}
        height={20}
        color={Constants.colors.primitive.pink['400']}
      />
    );
  }
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Constants.colors.primitive.gray['400'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
});
