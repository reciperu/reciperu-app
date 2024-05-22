import { memo } from 'react';
import { View } from 'react-native';

import { Constants } from '@/constants';
import { AppIcon } from '@/cores/components/icons';

interface Props {
  checked: boolean;
  size?: number;
}

export const CheckIconButton = memo<Props>(({ checked, size = 20 }) => {
  if (checked) {
    return (
      <AppIcon
        name="check-mark"
        width={size}
        height={size}
        color={Constants.colors.primitive.pink['400']}
      />
    );
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: Constants.radius['xl'],
        borderWidth: 1,
        borderColor: Constants.colors.primitive.gray['400'],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
});
