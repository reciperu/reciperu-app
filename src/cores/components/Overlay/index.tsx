import { memo } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Overlay = memo<{ visible: boolean; onPress: () => void }>(({ visible, onPress }) => {
  if (!visible) return null;
  return (
    <Pressable onPress={onPress} style={styles.overlay}>
      <View />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width,
    height,
    zIndex: 0,
  },
});
