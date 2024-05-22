import React, { PropsWithChildren, memo, useCallback, useEffect, useState } from 'react';
import { TextInput as RNTextInput, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Spacer } from '../Spacer';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';

interface Props {
  style?: StyleProp<ViewStyle>;
  onChange: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
  placeholder?: string;
  maxLength?: number;
  errorMessage?: string;
  multiline?: boolean;
  numberOfLines?: number;
  description?: string;
}

export const TextInput = memo<PropsWithChildren<Props>>(
  ({
    style,
    onChange,
    onBlur,
    onFocus,
    value,
    placeholder = '',
    maxLength,
    errorMessage,
    multiline,
    numberOfLines = 1,
    description,
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isError, setIsError] = useState(false);

    // フォーカス時のスタイルを適用するためのハンドラ
    const handleFocus = useCallback(() => {
      setIsFocused(true);
      setIsError(false); // エラー状態をクリアする場合
      if (onFocus) onFocus();
    }, [onFocus]);

    // フォーカスが外れた時のハンドラ
    const handleBlur = useCallback(() => {
      setIsFocused(false);
      if (onBlur) onBlur();
      // ここでエラーチェックのロジックを実行することもできます
    }, [onBlur]);

    // エラー状態を設定する関数
    useEffect(() => {
      if (errorMessage?.length) {
        setIsError(true);
      }
    }, []);

    return (
      <View>
        <RNTextInput
          style={[
            {
              borderWidth: 2,
              paddingVertical: 12,
              paddingHorizontal: 12,
              borderColor: Constants.colors.primitive.gray[200],
              borderRadius: Constants.radius['base'],
            },
            isFocused && styles.inputFocus, // フォーカス時にスタイルを適用
            isError && styles.inputError, // エラー時にスタイルを適用
            style,
          ]}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {(typeof maxLength === 'number' || typeof description === 'string') && (
          <Flex style={{ justifyContent: 'space-between', marginTop: 4 }}>
            {typeof description === 'string' && (
              <NotoText style={styles.description}>{description}</NotoText>
            )}
            <Spacer />
            {typeof maxLength === 'number' && (
              <NotoText style={styles.count}>
                {value.length}/{maxLength}
              </NotoText>
            )}
          </Flex>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputFocus: {
    borderColor: Constants.colors.primitive.blue[400], // フォーカス時のボーダーカラー
  },
  inputError: {
    borderColor: Constants.colors.primitive.red[400], // エラー時のボーダーカラー
  },
  description: { fontSize: 12, color: Constants.colors.primitive.gray[600] },
  count: { fontSize: 12 },
});
