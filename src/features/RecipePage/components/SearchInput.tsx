import { memo, useCallback, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { AppIcon } from '@/cores/components/icons';

interface Props {
  search: string;
  setSearch: (search: string) => void;
}

export const SearchInput = memo<Props>(({ search, setSearch }) => {
  const [text, setText] = useState('');

  const handleBlur = useCallback(() => {
    setSearch(text);
  }, [text]);

  const clearText = useCallback(() => {
    setSearch('');
    setText('');
  }, [text]);

  return (
    <View style={{ position: 'relative' }}>
      <TextInput
        style={{
          backgroundColor: Constants.colors.primitive.gray[100],
          borderRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 28,
          fontSize: 14,
          position: 'relative',
        }}
        placeholder="レシピ名を検索"
        value={text}
        onChangeText={setText}
        onBlur={handleBlur}
      />
      <Flex
        style={{
          position: 'absolute',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
        }}>
        <AppIcon
          name="search"
          width={16}
          height={16}
          color={Constants.colors.primitive.gray[400]}
        />
      </Flex>
      {text.length > 0 && (
        <Flex
          style={{
            position: 'absolute',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            right: 0,
          }}>
          <Pressable onPress={clearText}>
            <AppIcon
              name="close"
              width={16}
              height={16}
              color={Constants.colors.primitive.gray[400]}
            />
          </Pressable>
        </Flex>
      )}
    </View>
  );
});
