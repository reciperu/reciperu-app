import { useQueryClient } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import { Dimensions, Pressable, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { useRecipes } from '../../hooks/useRecipes';
import { RequestedRecipesResponse, SpaceRecipe } from '../../types';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { useRecipeRequest } from '@/features/RecipePage/hooks/useRecipeRequest';
import { useUser } from '@/features/User/hooks/useUser';

interface Props {
  data: SpaceRecipe;
  showRecipeDetail?: boolean;
}

const { width } = Dimensions.get('window');

export const RecipeDetail = memo<Props>(({ data, showRecipeDetail = true }) => {
  const router = useRouter();
  const [visibleIndex, setIsVisibleIndex] = useState<null | number>(null);
  const queryClient = useQueryClient();
  const { myInfo } = useUser();
  const [recipeData, setRecipeData] = useState<SpaceRecipe>(data);
  const { getFavorite, addRequester, removeRequester } = useRecipes();
  const recipeRequestService = useRecipeRequest();
  // 「食べたい」のステートを入れ替える
  const toggleRequest = useCallback(async () => {
    const handleSuccessAdd = () => {
      const newRequesters = addRequester(recipeData.requesters) || [];
      setRecipeData((prev) => ({ ...prev, requesters: newRequesters }));
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: [
                {
                  ...recipeData,
                  requesters: newRequesters,
                },
                ...data.data[userId],
              ],
            },
          };
        }
        return data;
      });
    };
    const handleSuccessRemove = () => {
      const newRequesters = removeRequester(recipeData.requesters) || [];
      setRecipeData((prev) => ({ ...prev, requesters: newRequesters }));
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: data.data[userId].filter((item) => item.id !== recipeData.id),
            },
          };
        }
        return data;
      });
    };
    recipeRequestService.toggle(recipeData, handleSuccessAdd, handleSuccessRemove);
  }, [recipeData, recipeRequestService, addRequester, removeRequester, queryClient, myInfo]);
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
          marginTop: 4,
          justifyContent: 'space-between',
        }}>
        <NotoText
          fw="bold"
          style={{
            fontSize: 16,
            paddingTop: 4,
            flex: 1,
            color: Constants.colors.primitive['gray']['600'],
          }}>
          {recipeData.title}
        </NotoText>
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
        {recipeData.user && (
          <Flex
            style={{
              gap: 8,
              height: 48,
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: Constants.colors.primitive.gray[200],
            }}>
            <NotoText style={{ fontSize: 12, width: 48 }}>登録者</NotoText>
            <Flex style={{ alignItems: 'center', gap: 4 }}>
              <Image
                source={{ uri: recipeData.user.imageUrl }}
                style={{ width: 20, height: 20, borderRadius: 10 }}
              />
              <NotoText style={{ fontSize: 12 }}>{data.user.name}</NotoText>
            </Flex>
          </Flex>
        )}
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
              height: 48,
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
            <Spacer />
            {showRecipeDetail && (
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  router.push({
                    pathname: `/recipe_detail/${data.id}/webview`,
                    params: { title: data.title, recipeUrl: data.recipeUrl },
                  });
                }}>
                <Flex
                  style={{
                    gap: 8,
                    paddingHorizontal: 6,
                    paddingVertical: 6,
                    alignItems: 'center',
                    backgroundColor: Constants.colors.primitive.gray[50],
                    borderRadius: 24,
                  }}>
                  <AppIcon
                    name="safari"
                    width={22}
                    height={22}
                    color={Constants.colors.primitive.gray[500]}
                  />
                </Flex>
              </Pressable>
            )}
          </Flex>
        )}
        {!!data.imageUrls?.length && (
          <>
            <View style={{ paddingVertical: 12, flexDirection: 'row', gap: 12 }}>
              {/* // TODO: クリックして詳細を確認できる  */}
              {data.imageUrls.map((url, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setIsVisibleIndex(index);
                  }}>
                  <Image
                    source={{ uri: url }}
                    alt={data.title}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: Constants.radius.lg,
                      marginVertical: 8,
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <ImageView
              images={data.imageUrls.map((url) => ({ uri: url }))}
              imageIndex={visibleIndex || 0}
              visible={visibleIndex !== null}
              onRequestClose={() => setIsVisibleIndex(null)}
            />
          </>
        )}
        {!!data.memo?.length && (
          <View
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: Constants.colors.primitive.gray[50],
              borderRadius: Constants.radius.md,
            }}>
            <NotoText>{data.memo}</NotoText>
          </View>
        )}
      </View>
    </View>
  );
});
