import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { CheckImage } from '@/components/ui/CheckList/components/Icon';
import { CheckListItemObject } from '@/components/ui/CheckList/types';
import { Flex } from '@/components/ui/Flex';
import { Text } from '@/components/ui/Text';

export const CheckListItem = memo<PropsWithChildren<CheckListItemObject>>(
  ({ checked = false, value }) => {
    return (
      <Flex style={styles.container}>
        <CheckImage checked={checked} />
        <Text style={styles.text}>{value}</Text>
      </Flex>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 4,
  },
  text: { fontSize: 14 },
});
