import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@/components/ui/Text';

export const InputLabel = memo<PropsWithChildren>(({ children }) => {
  return <Text style={styles.wrapper}>{children}</Text>;
});

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 12,
    marginBottom: 8,
  },
});
