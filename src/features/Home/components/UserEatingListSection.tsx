import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
  avatar?: string;
  name?: string;
  list: string[];
  loading: boolean;
  type: 'mine' | 'other';
}

export const UserEatingListSection = memo<Props>(({ avatar, name, list, loading, type }) => {
  if (!avatar || !name) return null;
  return (
    <View>
      <Flex style={{ gap: 8, alignItems: 'center' }}>
        <Image
          source={avatar}
          style={{ width: 24, height: 24, borderRadius: 12 }}
          contentFit="contain"
        />
        <NotoText fw="bold" style={{ fontSize: 16, lineHeight: 24 }}>
          {name}さんの食べたい料理
        </NotoText>
        <Spacer />
        {type === 'mine' && (
          <Pressable>
            <Flex style={{ gap: 4, alignItems: 'center' }}>
              <Text
                style={{
                  color: Constants.colors.primitive.blue[400],
                  fontSize: 12,
                  textDecorationLine: 'underline',
                }}>
                変更する
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
        )}
      </Flex>
      <View style={{ paddingVertical: 16 }}>
        {/* 取得中 */}
        {/* データがない場合 */}
        <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <AppIcon
            name="emoji-sad"
            width={20}
            height={20}
            color={Constants.colors.primitive.gray[400]}
          />
          <NotoText
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: Constants.colors.primitive.gray[600],
            }}>
            {`食べたい料理は未登録です
レシピ集に登録された料理から食べたい料理を選びましょう`}
          </NotoText>
          <Pressable>
            <Text
              style={{
                color: Constants.colors.primitive.blue[400],
                fontSize: 14,
                textDecorationLine: 'underline',
              }}>
              料理を探す
            </Text>
          </Pressable>
        </Flex>
        {/* データがある場合 */}
      </View>
    </View>
  );
});
