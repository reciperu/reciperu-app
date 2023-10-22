import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui/Text';

interface Props {
  leftIcon?: React.ReactNode;
  variant?: 'primary' | 'others';
  scheme?: 'filled' | 'text';
  children: string;
  disabled?: boolean;
  onPress: () => void;
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
      <TouchableOpacity
        disabled={disabled || loading}
        onPress={onPress}
        style={[
          styles.wrapper,
          (disabled || loading) && styles.disabledContainer,
          (disabled || loading) && styles.disabledTextContainer,
        ]}>
        {scheme === 'filled' ? (
          <>
            {variant === 'primary' ? (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1.0, y: 1.0 }}
                locations={[0, 0.6, 1]}
                colors={['#FF8753', '#ED64A6', '#ED64A6']}>
                <View style={styles.container}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    leftIcon && leftIcon
                  )}
                  <Text style={[styles.text, styles.primaryText, textStyle]} fw="bold">
                    {children}
                  </Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.container, { backgroundColor: bgColor }]}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  leftIcon && leftIcon
                )}
                <Text style={[styles.text, styles.primaryText, textStyle]} fw="bold">
                  {children}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.container}>
            {loading ? <ActivityIndicator size="small" /> : leftIcon && leftIcon}
            <Text style={[styles.text, textStyle]} fw="bold">
              {children}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  primaryText: {
    color: '#fff',
  },
  disabledContainer: {
    opacity: 0.4,
  },
  disabledTextContainer: {
    backgroundColor: '#f0f0f0',
  },
});
