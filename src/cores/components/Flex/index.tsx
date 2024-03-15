import { PropsWithChildren, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Flex = memo<PropsWithChildren<Props>>(({ children, style }) => (
  <View style={[{ display: 'flex', flexDirection: 'row' }, style]}>{children}</View>
));
