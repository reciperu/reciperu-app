import React, { PropsWithChildren, memo, useMemo } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface LineProps {
  style?: StyleProp<TextStyle>;
  fw?: 'light' | 'regular' | 'bold' | 'extra-bold';
}

export const LineText = memo<PropsWithChildren<LineProps>>(
  ({ children, fw = 'regular', style }) => {
    const fontFamily = useMemo(() => 'LINE-' + fw, [fw]);
    return <RNText style={[{ fontFamily }, style]}>{children}</RNText>;
  }
);

interface NotoProps {
  style?: StyleProp<TextStyle>;
  fw?: 'regular' | 'bold' | 'black';
}

export const NotoText = memo<PropsWithChildren<NotoProps>>(
  ({ children, fw = 'regular', style }) => {
    const fontFamily = useMemo(() => 'noto-sans-' + fw, [fw]);
    return <RNText style={[{ fontFamily }, style]}>{children}</RNText>;
  }
);
