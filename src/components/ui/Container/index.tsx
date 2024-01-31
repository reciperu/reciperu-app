import { PropsWithChildren, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  bgColor?: string;
}

export const Container = memo<PropsWithChildren<Props>>(({ children, bgColor = '#FFFFFF' }) => {
  return <View style={[styles.container, { backgroundColor: bgColor }]}>{children}</View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 50,
    width: '100%',
  },
});
