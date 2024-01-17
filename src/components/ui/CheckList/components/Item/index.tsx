import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { CheckImage } from '@/components/ui/CheckList/components/Icon';
import { CheckListItemObject } from '@/components/ui/CheckList/types';
import { Flex } from '@/components/ui/Flex';
import { NotoText } from '@/components/ui/Text';

export const CheckListItem = memo<PropsWithChildren<CheckListItemObject>>(
  ({ checked = false, value }) => {
    return (
      <Flex style={styles.container}>
        <CheckImage checked={checked} />
        <NotoText style={styles.text}>{value}</NotoText>
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
