import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '../icons';

import { Constants } from '@/constants';

export const HeaderNotificationIcon = memo(() => {
  const router = useRouter();
  return (
    <Pressable style={styles.container} onPress={() => router.push('(main)/notification')}>
      <View>
        <AppIcon name="bell" color={Constants.colors.primitive.gray[400]} />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
