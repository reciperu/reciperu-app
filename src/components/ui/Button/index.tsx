import React, { memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '@/components/ui/Text';
import { Constants } from '@/constants';

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
                <Text style={[styles.text, styles.primaryText, textStyle]} fw="bold">
                  {children}
                </Text>
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
                <Text style={[styles.text, styles.othersText, textStyle]} fw="bold">
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
      </Pressable>
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
    borderRadius: 24,
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
