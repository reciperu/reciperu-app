import { PropsWithChildren, memo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  bgColor?: string;
  needBottomPadding?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Container = memo<PropsWithChildren<Props>>(
  ({ children, bgColor = '#FFFFFF', needBottomPadding = true, style }) => {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: bgColor,
            paddingBottom: needBottomPadding ? 50 : 0,
          },
          style,
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
