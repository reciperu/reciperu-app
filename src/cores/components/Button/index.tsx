import React, { memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Constants } from '@/constants';
import { NotoText } from '@/cores/components/Text';

interface Props {
  leftIcon?: React.ReactNode;
  variant?: 'primary' | 'others';
  scheme?: 'filled' | 'text';
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  bgColor?: string;
  textStyle?: any;
  loading?: boolean;
}

export const Button = memo<Props>(
  ({
    onPress,
    children,
    leftIcon,
    scheme = 'filled',
    variant = 'primary',
    disabled,
    loading,
    bgColor,
    textStyle = {},
  }) => {
    return (
      <Pressable disabled={disabled || loading} onPress={onPress}>
        {scheme === 'filled' ? (
          <>
            {variant === 'primary' ? (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1.0, y: 1.0 }}
                locations={[0, 0.6, 1]}
                style={[
                  styles.container,
                  (disabled || loading) && styles.disabledContainer,
                  (disabled || loading) && styles.disabledTextContainer,
                ]}
                colors={['#FF8753', '#ED64A6', '#ED64A6']}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  leftIcon && leftIcon
                )}
                <NotoText style={[styles.text, styles.primaryText, textStyle]} fw="bold">
                  {children}
                </NotoText>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.container,
                  { backgroundColor: bgColor },
                  (disabled || loading) && styles.disabledContainer,
                  (disabled || loading) && styles.disabledTextContainer,
                ]}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  leftIcon && leftIcon
                )}
                <NotoText style={[styles.text, styles.othersText, textStyle]} fw="bold">
                  {children}
                </NotoText>
              </View>
            )}
          </>
        ) : (
          <View style={styles.container}>
            {loading ? <ActivityIndicator size="small" /> : leftIcon && leftIcon}
            <NotoText
              style={[styles.text, textStyle, variant === 'primary' && styles.textButtonTextStyle]}
              fw="bold">
              {children}
            </NotoText>
          </View>
        )}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Constants.radius['3xl'],
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    padding: 12,
    borderRadius: Constants.radius['3xl'],
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  textButtonTextStyle: {
    color: Constants.colors.primitive.pink[400],
  },
  primaryText: {
    color: '#fff',
  },
  othersText: {
    color: Constants.colors.primitive.pink[400],
  },
  disabledContainer: {
    opacity: 0.4,
  },
  disabledTextContainer: {
    backgroundColor: '#f0f0f0',
  },
});
