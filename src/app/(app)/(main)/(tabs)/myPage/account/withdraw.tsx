import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/cores/components/Button';
import { CheckIconButton } from '@/cores/components/CheckIconButton';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';

export default function WithdrawPage() {
  const [checked, setChecked] = useState(false);
  return (
    <Container bgColor="white">
      <Stack.Screen
        options={{
          title: '退会する',
        }}
      />
      <View>
        {/* // TODO: 本文を追加 */}
        <Text>xxxxx xxxxx xxxxx xxxxx</Text>
      </View>
      <Flex style={{ alignItems: 'center', gap: 4, justifyContent: 'center', marginVertical: 32 }}>
        <Pressable style={{ paddingRight: 4 }} onPress={() => setChecked((prev) => !prev)}>
          <CheckIconButton checked={checked} size={18} />
        </Pressable>
        <NotoText
          style={{
            fontSize: 12,
          }}>
          上記の内容を全て確認しました
        </NotoText>
      </Flex>
      <Button disabled={!checked}>同意して退会する</Button>
    </Container>
  );
}
