import { PropsWithChildren, memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { NotoText } from '../Text';
import { Constants } from '@/constants';

interface Props {
  required?: boolean;
}

export const InputLabel = memo<PropsWithChildren<Props>>(({ children, required = false }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
      }}>
      <NotoText style={styles.wrapper}>{children}</NotoText>
      {required && (
        <View
          style={{
            backgroundColor: Constants.colors.primitive.red[50],
            marginLeft: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Constants.radius.full,
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}>
          <NotoText
            fw="bold"
            style={{
              fontSize: 10,
              color: Constants.colors.primitive.red[500],
            }}>
            必須
          </NotoText>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 12,
  },
});
