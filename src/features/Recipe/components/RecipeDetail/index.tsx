import { memo } from 'react';
import { SpaceRecipe } from '../../types';
import { Image } from 'expo-image';
import { NotoText } from '@/cores/components/Text';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { AppIcon } from '@/cores/components/icons';

interface Props {
  data: SpaceRecipe;
}

const { width } = Dimensions.get('window');

export const RecipeDetail = memo<Props>(({ data }) => {
  return (
    <View>
      <Image
        source={{ uri: data.thumbnailUrl }}
        alt={data.title}
        style={{
          width: width - 32,
          height: ((width - 32) / 16) * 9,
          borderRadius: Constants.radius.lg,
        }}
      />
      <Flex
        style={{
          marginTop: 8,
          justifyContent: 'space-between',
        }}>
        <NotoText fw="bold">{data.title}</NotoText>
        <View>
          <TouchableOpacity onPress={() => console.log('call favorite')}>
            <View
              style={{
                padding: 8,
                backgroundColor: 'white',
                borderRadius: 24,
              }}>
              <AppIcon
                name="bookmark"
                width={16}
                height={16}
                color={
                  data.isFavorite
                    ? Constants.colors.primitive.pink[400]
                    : Constants.colors.primitive.gray[300]
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </Flex>
      <View
        style={{
          marginTop: 8,
          width: '100%',
        }}>
        {/* 登録者 */}
        <Flex
          style={{
            gap: 8,
            alignItems: 'center',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: Constants.colors.primitive.gray[200],
          }}>
          <NotoText style={{ fontSize: 12, width: 48 }}>登録者</NotoText>
          <Flex style={{ alignItems: 'center' }}>
            <NotoText style={{ fontSize: 12 }}>ハナコ</NotoText>
          </Flex>
        </Flex>
        {/* 更新者（あれば） */}
        <Flex
          style={{
            gap: 8,
            alignItems: 'center',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: Constants.colors.primitive.gray[200],
          }}>
          <NotoText style={{ fontSize: 12, width: 48 }}>更新者</NotoText>
          <Flex style={{ alignItems: 'center' }}>
            <NotoText style={{ fontSize: 12 }}>ハナコ</NotoText>
          </Flex>
        </Flex>
        {/* レシピ（あれば） */}
        {data.recipeUrl.length > 0 && (
          <Flex
            style={{
              gap: 8,
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: Constants.colors.primitive.gray[200],
            }}>
            <NotoText style={{ fontSize: 12, width: 48 }}>レシピ</NotoText>
            <Flex style={{ alignItems: 'center', gap: 4 }}>
              <Image
                source={{ uri: data.faviconUrl }}
                style={{ width: 20, height: 20, borderRadius: 10 }}
              />
              <NotoText style={{ fontSize: 12 }}>{data.appName}</NotoText>
            </Flex>
          </Flex>
        )}
      </View>
    </View>
  );
});
