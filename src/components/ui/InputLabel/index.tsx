import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@/components/ui/Text';

interface Props {
  required?: boolean;
}

export const InputLabel = memo<PropsWithChildren<Props>>(({ children, required = false }) => {
  return (
    <Text style={styles.wrapper}>
      {children}
      {required && '（必須）'}
    </Text>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 12,
    marginBottom: 4,
  },
});
