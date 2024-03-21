import { PropsWithChildren, memo } from 'react';
import { Pressable } from 'react-native';

import { Flex } from '../Flex';
import { NotoText } from '../Text';

import { Constants } from '@/constants';

interface Props {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const LinkButton = memo<PropsWithChildren<Props>>(
  ({ onPress, loading, disabled, children }) => {
    return (
      <Pressable onPress={onPress} disabled={loading || disabled}>
        <Flex
          style={{
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 24,
            backgroundColor: Constants.colors.primitive.pink[50],
            gap: 12,
            justifyContent: 'center',
          }}>
          <NotoText
            style={{
              fontSize: 12,
              color: Constants.colors.primitive.pink[400],
              textDecorationStyle: 'solid',
              textDecorationColor: Constants.colors.primitive.pink[400],
              textDecorationLine: 'underline',
            }}>
            {children}
          </NotoText>
        </Flex>
      </Pressable>
    );
  }
);
