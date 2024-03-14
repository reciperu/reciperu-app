import { PropsWithChildren, memo } from 'react';
import { StyleSheet } from 'react-native';

import { CheckImage } from '@/features/chore/CheckList/components/Icon';
import { CheckListItemObject } from '@/features/chore/CheckList/types';
import { Flex } from '@/features/chore/Flex';
import { NotoText } from '@/features/chore/Text';

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
