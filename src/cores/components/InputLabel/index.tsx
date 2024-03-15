import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { NotoText } from '../Text';

interface Props {
  required?: boolean;
}

export const InputLabel = memo<PropsWithChildren<Props>>(({ children, required = false }) => {
  return (
    <NotoText style={styles.wrapper}>
      {children}
      {required && '（必須）'}
    </NotoText>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 12,
    marginBottom: 4,
  },
});
