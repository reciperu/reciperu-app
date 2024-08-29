import { memo, useEffect } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NotoText } from '../Text';

import { Constants } from '@/constants';

const { width, height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  label?: string;
}

export const PageDialogLoader = memo<Props>(({ visible, label = '取得中...' }) => {
  const fadeInOpacity = useSharedValue(0);

  const fadeIn = () => {
    fadeInOpacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.linear,
    });
  };

  const fadeOut = () => {
    fadeInOpacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.linear,
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInOpacity.value, // Use the value directly
    };
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  });

  if (!visible) return null;

  return (
    <SafeAreaView
      style={{
        width,
        height: height - insets.top - insets.bottom,
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      <View style={styles.container}>
        <Animated.View style={[styles.wrapper, animatedStyle]}>
          <ActivityIndicator size="large" color={Constants.colors.primitive.white['undefined']} />
          <NotoText
            style={{
              color: Constants.colors.primitive.white['undefined'],
              fontSize: 14,
              textAlign: 'center',
            }}>
            {label}
          </NotoText>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: '#00000060',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Constants.radius.xl,
    gap: Constants.spacing[2],
    padding: Constants.spacing[2],
  },
});
