import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, RefreshControl, TouchableOpacity, View, FlatList } from 'react-native';

import { EmptyView } from './EmptyView';
import { ErrorView } from './ErrorView';
import { ListFooterView } from './ListFooterView';
import { PendingLoader } from './PendingLoader';
import { useRecipeRequest } from '../hooks/useRecipeRequest';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { AppIcon } from '@/cores/components/icons';
import { useFetchRecipes } from '@/features/Recipe/apis/getRecipes';
import { RecipeItem } from '@/features/Recipe/components/RecipeItem';
import { useRecipes } from '@/features/Recipe/hooks/useRecipes';
import { RequestedRecipesResponse, SpaceRecipe } from '@/features/Recipe/types';
import { useUser } from '@/features/User/hooks/useUser';
import { sleep } from '@/utils/sleep';

interface Props {
  search: string;
}

export const AllRecipeTab = memo<Props>(({ search }) => {
  const router = useRouter();
  const isFirst = useRef(true);
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { getFavorite, addRequester, removeRequester } = useRecipes();
  const { myInfo } = useUser();
  const [params, setParams] = useState<{
    cursor?: number;
    title?: string;
  }>({
    cursor: undefined,
    title: search,
  });
  const recipeRequestService = useRecipeRequest();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = useFetchRecipes({ params });

  console.log(`params: ${JSON.stringify(params)}`);

  const displayData = useMemo(() => {
    const arr = [];
    if (data?.pages) {
      for (const page of data.pages) {
        arr.push(...page.recipes);
      }
    }
    return arr;
  }, [data]);

  // 次のページを取得
  const handleEndReached = useCallback(async () => {
    if (!isFetching) {
      // 2秒待機
      await sleep(2000);
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

  // 「食べたい」のステートを入れ替える
  const toggleRequest = useCallback(
    async (item: SpaceRecipe) => {
      const handlePrepareAdd = () => {
        queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
          const userId = myInfo?.id;
          if (userId && data.data[userId]) {
            return {
              data: {
                ...data.data,
                [userId]: [
                  {
                    ...item,
                    requesters: addRequester(item.requesters) || [],
                  },
                  ...data.data[userId],
                ],
              },
            };
          }
          return data;
        });
        queryClient.setQueryData(
          ['recipes', { isRequested: undefined, title: params.title }],
          (data: any) => ({
            pages: data.pages.map((page: any) => {
              return {
                ...page,
                recipes: page.recipes.map((recipe: any) => {
                  if (recipe.id === item.id) {
                    return {
                      ...recipe,
                      requesters: addRequester(recipe.requesters),
                    };
                  }
                  return recipe;
                }),
              };
            }),
            pageParams: data.pageParams,
          })
        );
      };
      const handlePrepareRemove = () => {
        queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
          const userId = myInfo?.id;
          if (userId && data.data[userId]) {
            return {
              data: {
                ...data.data,
                [userId]: data.data[userId].filter((recipe) => recipe.id !== item.id),
              },
            };
          }
          return data;
        });
        queryClient.setQueryData(
          ['recipes', { isRequested: undefined, title: params.title }],
          (data: any) => ({
            pages: data.pages.map((page: any) => {
              return {
                ...page,
                recipes: page.recipes.map((recipe: any) => {
                  if (recipe.id === item.id) {
                    return {
                      ...recipe,
                      requesters: removeRequester(recipe.requesters),
                    };
                  }
                  return recipe;
                }),
              };
            }),
            pageParams: data.pageParams,
          })
        );
      };
      const handleSuccessAdd = () => {};
      const handleSuccessRemove = () => {};
      const handleErrorAdd = () => {
        queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
          const userId = myInfo?.id;
          if (userId && data.data[userId]) {
            return {
              data: {
                ...data.data,
                [userId]: data.data[userId].filter((recipe) => recipe.id !== item.id),
              },
            };
          }
          return data;
        });
        queryClient.setQueryData(
          ['recipes', { isRequested: undefined, title: params.title }],
          (data: any) => ({
            pages: data.pages.map((page: any) => {
              return {
                ...page,
                recipes: page.recipes.map((recipe: any) => {
                  if (recipe.id === item.id) {
                    return {
                      ...recipe,
                      requesters: removeRequester(recipe.requesters),
                    };
                  }
                  return recipe;
                }),
              };
            }),
            pageParams: data.pageParams,
          })
        );
      };
      const handleErrorRemove = () => {
        queryClient.setQueryData(['requested-recipes'], (data: RequestedRecipesResponse) => {
          const userId = myInfo?.id;
          if (userId && data.data[userId]) {
            return {
              data: {
                ...data.data,
                [userId]: [
                  {
                    ...item,
                    requesters: addRequester(item.requesters) || [],
                  },
                  ...data.data[userId],
                ],
              },
            };
          }
          return data;
        });
        queryClient.setQueryData(
          ['recipes', { isRequested: undefined, title: params.title }],
          (data: any) => ({
            pages: data.pages.map((page: any) => {
              return {
                ...page,
                recipes: page.recipes.map((recipe: any) => {
                  if (recipe.id === item.id) {
                    return {
                      ...recipe,
                      requesters: addRequester(recipe.requesters),
                    };
                  }
                  return recipe;
                }),
              };
            }),
            pageParams: data.pageParams,
          })
        );
      };
      recipeRequestService.toggle(
        item,
        handlePrepareAdd,
        handlePrepareRemove,
        handleSuccessAdd,
        handleSuccessRemove,
        handleErrorAdd,
        handleErrorRemove
      );
    },
    [recipeRequestService, addRequester, removeRequester, params.title, queryClient, myInfo?.id]
  );
  // リフレッシュ
  const onRefresh = useCallback(async () => {
    if (isRefetching) return;
    setRefreshing(true);
    // 2秒待機
    await sleep(2000);
    refetch();
    setRefreshing(false);
  }, [isRefetching, refetch]);

  console.log(`search: ${search}`);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (params.title !== search) {
      console.log(`search updated: ${search}`);
      setParams({ ...params, title: search });
    }
  }, [search]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* ローディング中 */}
      {status === 'pending' ? (
        <PendingLoader />
      ) : (
        <>
          {/* エラー時 */}
          {status === 'error' ? (
            <ErrorView value={error?.message} />
          ) : (
            <>
              {/* データがない場合 */}
              {!displayData.length ? (
                <EmptyView />
              ) : (
                <FlatList
                  data={displayData}
                  contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
                  keyExtractor={(item, idx) => `${item.id}-${idx}-${item.requesters.join('-')}`}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  renderItem={({ item }) => (
                    <Flex style={{ paddingVertical: 8, gap: 4 }}>
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() =>
                          router.push({
                            pathname: `recipe_detail/${item.id}`,
                            params: {
                              ...item,
                              imageUrls: JSON.stringify(item.imageUrls),
                              requesters: JSON.stringify(item.requesters),
                              user: JSON.stringify(item.user),
                            },
                          })
                        }>
                        <RecipeItem data={item} />
                      </Pressable>
                      <View>
                        <TouchableOpacity onPress={() => toggleRequest(item)}>
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
                                getFavorite(item.requesters)
                                  ? Constants.colors.primitive.pink[400]
                                  : Constants.colors.primitive.gray[300]
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Flex>
                  )}
                  onEndReached={handleEndReached}
                  ListFooterComponent={() => (
                    <ListFooterView
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  )}
                />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
});
