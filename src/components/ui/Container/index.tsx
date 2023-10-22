import { PropsWithChildren, memo } from 'react';
import { StyleSheet, View } from 'react-native';

export const Container = memo<PropsWithChildren>(({ children }) => {
  return <View style={[styles.container]}>{children}</View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
});
