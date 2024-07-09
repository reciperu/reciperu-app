import React, { memo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

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
    const [pressing, setPressing] = useState(false);
    return (
      <Pressable
        disabled={disabled || loading}
        onPress={onPress}
        onPressIn={() => setPressing(true)}
        onPressOut={() => setPressing(false)}>
        {scheme === 'filled' ? (
          <>
            {variant === 'primary' ? (
              <View
                style={[
                  styles.container,
                  (disabled || loading) && styles.disabledContainer,
                  pressing && { opacity: 0.7 },
                ]}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  leftIcon && leftIcon
                )}
                <NotoText style={[styles.text, styles.primaryText, textStyle]} fw="bold">
                  {children}
                </NotoText>
              </View>
            ) : (
              <View
                style={[
                  styles.container,
                  { backgroundColor: bgColor },
                  (disabled || loading) && styles.disabledTextContainer,
                  pressing && { opacity: 0.7 },
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
          <View
            style={[
              styles.container,
              styles.schemeTextContainer,
              pressing && {
                backgroundColor:
                  variant === 'primary'
                    ? Constants.colors.primitive.pink[50]
                    : Constants.colors.primitive.gray[50],
              },
            ]}>
            {loading ? <ActivityIndicator size="small" /> : leftIcon && leftIcon}
            <NotoText
              style={[styles.text, variant === 'primary' && styles.textButtonTextStyle, textStyle]}
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
    backgroundColor: Constants.colors.primitive.pink[400],
    overflow: 'hidden',
  },
  schemeTextContainer: {
    backgroundColor: 'transparent',
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
