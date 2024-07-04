import { PropsWithChildren, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  bgColor?: string;
  needBottomPadding?: boolean;
}

export const Container = memo<PropsWithChildren<Props>>(
  ({ children, bgColor = '#FFFFFF', needBottomPadding = true }) => {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bgColor,
            paddingBottom: needBottomPadding ? 50 : 0,
          },
        ]}>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },
});
