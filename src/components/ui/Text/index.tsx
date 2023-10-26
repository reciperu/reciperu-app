import React, { memo, useMemo } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string;
  style?: StyleProp<TextStyle>;
  fw?: 'light' | 'regular' | 'bold' | 'extra-bold';
}

export const Text = memo<Props>(({ children, fw = 'regular', style }) => {
  const fontFamily = useMemo(() => 'LINE-' + fw, [fw]);
  return <RNText style={[{ fontFamily }, style]}>{children}</RNText>;
});
