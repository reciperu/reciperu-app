import { PropsWithChildren, memo, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { Flex } from '../Flex';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const ToastWrapper = memo<PropsWithChildren<Props>>(({ children, style }) => {
  const containerStyle = useMemo(() => {
    if (style) {
      return {
        width: '90%',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        gap: 8,
        alignItems: 'center',
        shadowColor: '#7f7f7f',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.62,
        elevation: 8,
        borderWidth: 1,
        ...(style as any),
      };
    }
    return {
      width: '90%',
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 8,
      gap: 8,
      alignItems: 'center',
      shadowColor: '#7f7f7f',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.62,
      elevation: 8,
      borderWidth: 1,
    };
  }, [style]);
  return <Flex style={containerStyle}>{children}</Flex>;
});
