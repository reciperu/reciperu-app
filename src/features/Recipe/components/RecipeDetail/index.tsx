import { Image } from 'expo-image';
import { memo, useCallback, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import { useRecipes } from '../../hooks/useRecipes';
import { SpaceRecipe } from '../../types';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { useRecipeRequest } from '@/features/RecipePage/hooks/useRecipeRequest';

interface Props {
  data: SpaceRecipe;
}

const { width } = Dimensions.get('window');

export const RecipeDetail = memo<Props>(({ data }) => {
  const [recipeData, setRecipeData] = useState<SpaceRecipe>(data);
  const { getFavorite, addRequester, removeRequester } = useRecipes();
  console.log(`recipeData: ${JSON.stringify(recipeData)}`);
  const recipeRequestService = useRecipeRequest();
  // 「食べたい」のステートを入れ替える
  const toggleRequest = useCallback(async () => {
    const handleSuccessAdd = () => {
      setRecipeData((prev) => ({ ...prev, requesters: addRequester(prev.requesters) }));
    };
    const handleSuccessRemove = () => {
      setRecipeData((prev) => ({ ...prev, requesters: removeRequester(prev.requesters) }));
    };
    recipeRequestService.toggle(recipeData, handleSuccessAdd, handleSuccessRemove);
  }, [recipeData, recipeRequestService]);
  return (
    <View>
      <Image
        source={{ uri: recipeData.thumbnailUrl }}
        alt={recipeData.title}
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
        <NotoText fw="bold">{recipeData.title}</NotoText>
        <View>
          <TouchableOpacity onPress={toggleRequest}>
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
                  getFavorite(recipeData.requesters)
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
        {/* <Flex
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
        </Flex> */}
        {/* レシピ（あれば） */}
        {recipeData.recipeUrl.length > 0 && (
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
                source={{ uri: recipeData.faviconUrl }}
                style={{ width: 20, height: 20, borderRadius: 10 }}
              />
              <NotoText style={{ fontSize: 12 }}>{recipeData.appName}</NotoText>
            </Flex>
          </Flex>
        )}
      </View>
    </View>
  );
});
