import React, { PropsWithChildren, memo, useMemo } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface Props {
  style?: StyleProp<TextStyle>;
  fw?: 'light' | 'regular' | 'bold' | 'extra-bold';
}

export const Text = memo<PropsWithChildren<Props>>(({ children, fw = 'regular', style }) => {
  const fontFamily = useMemo(() => 'LINE-' + fw, [fw]);
  return <RNText style={[{ fontFamily }, style]}>{children}</RNText>;
});
