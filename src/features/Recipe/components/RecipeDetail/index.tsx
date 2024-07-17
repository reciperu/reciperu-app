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
    const handlePrepareAdd = () => {
      setRecipeData((prev) => ({ ...prev, requesters: addRequester(recipeData.requesters) || [] }));
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: [
                {
                  ...recipeData,
                  requesters: addRequester(recipeData.requesters) || [],
                },
                ...data.data[userId],
              ],
            },
          };
        }
        return data;
      });
    };
    const handlePrepareRemove = () => {
      setRecipeData((prev) => ({
        ...prev,
        requesters: removeRequester(recipeData.requesters) || [],
      }));
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
    const handleSuccessAdd = () => {
      setRecipeData((prev) => ({ ...prev, requesters: addRequester(recipeData.requesters) || [] }));
      queryClient.invalidateQueries({
        queryKey: ['recipes'],
      });
    };
    const handleErrorAdd = () => {
      setRecipeData(data);
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: data.data[userId].filter((recipe) => recipe.id !== recipeData.id),
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
    };
    const handleErrorRemove = () => {
      setRecipeData(data);
      queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
        const userId = myInfo?.id;
        if (userId && data.data[userId]) {
          return {
            data: {
              ...data.data,
              [userId]: [
                {
                  ...recipeData,
                  requesters: addRequester(recipeData.requesters) || [],
                },
                ...data.data[userId],
              ],
            },
          };
        }
        return data;
      });
    };
    recipeRequestService.toggle(
      recipeData,
      handlePrepareAdd,
      handlePrepareRemove,
      handleSuccessAdd,
      handleSuccessRemove,
      handleErrorAdd,
      handleErrorRemove
    );
  }, [recipeData, recipeRequestService, addRequester, removeRequester, queryClient, myInfo, data]);
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
      </Flex>
      <Flex style={{ justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
        {/* 登録者 */}
        {recipeData.user && (
          <Flex style={{ alignItems: 'center', gap: 4 }}>
            <Image
              source={{ uri: recipeData.user.imageUrl }}
              style={{ width: 20, height: 20, borderRadius: 10 }}
            />
            <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
              {data.user.name}
            </NotoText>
          </Flex>
        )}
        {/* レシピ（あれば） */}
        {recipeData.recipeUrl.length > 0 && (
          <Flex style={{ alignItems: 'center', gap: 4, marginLeft: 4 }}>
            <Image
              source={{ uri: recipeData.faviconUrl }}
              style={{ width: 20, height: 20, borderRadius: 10 }}
            />
            <NotoText style={{ fontSize: 12, color: Constants.colors.primitive.gray[600] }}>
              {recipeData.appName}
            </NotoText>
          </Flex>
        )}
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
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Constants.colors.primitive.gray[50],
                borderRadius: 40,
              }}>
              <AppIcon
                name="safari"
                width={18}
                height={18}
                color={Constants.colors.primitive.gray[500]}
              />
            </Flex>
          </Pressable>
        )}
        <View>
          <TouchableOpacity onPress={toggleRequest}>
            <Flex
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: getFavorite(recipeData.requesters)
                  ? Constants.colors.primitive.pink[50]
                  : Constants.colors.primitive.gray[50],
                borderRadius: 40,
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
            </Flex>
          </TouchableOpacity>
        </View>
      </Flex>
      <View
        style={{
          marginTop: 8,
          width: '100%',
        }}>
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
        {!!data.imageUrls?.length && (
          <>
            <View style={{ paddingVertical: 12, flexDirection: 'row', gap: 12 }}>
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
