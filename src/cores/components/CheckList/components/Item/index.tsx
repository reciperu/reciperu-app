import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { CheckImage } from '@/cores/components/CheckList/components/Icon';
import { CheckListItemObject } from '@/cores/components/CheckList/types';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';

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
