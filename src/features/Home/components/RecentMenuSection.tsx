import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { FoodImage } from '@/cores/components/FoodImage';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';

export const RecentMenuSection = memo(() => {
  return (
    <View>
      <Flex style={{ gap: 8, alignItems: 'center' }}>
        <Image
          source={require('assets/recent_recipe_section_logo.svg')}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
        />
        <NotoText fw="bold" style={{ fontSize: 14, lineHeight: 24 }}>
          最近の献立
        </NotoText>
        <Spacer />
        <Pressable>
          <Flex style={{ gap: 4, alignItems: 'center' }}>
            <Text
              style={{
                color: Constants.colors.primitive.blue[400],
                fontSize: 12,
                textDecorationLine: 'underline',
              }}>
              もっと見る
            </Text>
            <View style={{ transform: 'rotate(180deg)' }}>
              <AppIcon
                name="arrow-back"
                color={Constants.colors.primitive.blue[400]}
                width={12}
                height={12}
              />
            </View>
          </Flex>
        </Pressable>
      </Flex>
      <View style={{ paddingVertical: 16 }}>
        {/* 取得中 */}
        {/* <ActivityIndicator color={Constants.colors.primitive.pink[400]} /> */}
        {/* データがない場合 */}
        <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <FoodImage />
          <NotoText
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: Constants.colors.primitive.gray[600],
            }}>
            {`食べたい料理は未登録です
レシピ集に登録された料理から食べたい料理を選びましょう`}
          </NotoText>
        </Flex>
        {/* データがある場合 */}
      </View>
    </View>
  );
});
