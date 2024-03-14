import { Image } from 'expo-image';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { AppIcon } from '@/features/chore/icons';

const CheckedImage = require('assets/checked.png') as string;

interface Props {
  checked?: boolean;
}

export const CheckImage = memo<Props>(({ checked = false }) => {
  if (checked) {
    return <Image contentFit="cover" source={CheckedImage} style={styles.iconSize} />;
  }
  return <AppIcon name="check-mark" />;
});

const styles = StyleSheet.create({
  iconSize: {
    width: 32,
    height: 32,
  },
});
