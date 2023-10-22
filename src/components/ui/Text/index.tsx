import React, { memo, useMemo } from 'react';
import { Text as RNText } from 'react-native';

interface Props {
  children: string;
  style?: any;
  fw?: 'light' | 'regular' | 'bold' | 'extra-bold';
}

export const Text = memo<Props>(({ children, fw = 'regular', style }) => {
  const fontFamily = useMemo(() => 'LINE-' + fw, [fw]);
  return <RNText style={[{ fontFamily }, style]}>{children}</RNText>;
});
