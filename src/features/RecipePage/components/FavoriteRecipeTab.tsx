import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { useDeleteRecipeRequest } from '@/features/Recipe/apis/deleteRecipeRequest';
import { useFetchRecipes } from '@/features/Recipe/apis/getRecipes';
import { usePostRecipeRequest } from '@/features/Recipe/apis/putRecipeRequest';
import { RecipeItem } from '@/features/Recipe/components/RecipeItem';
import { useRecipes } from '@/features/Recipe/hooks/useRecipes';
import { SpaceRecipe } from '@/features/Recipe/types';
import { useUpdateEffect } from '@/hooks/useUpdateEffect';
import { sleep } from '@/utils/sleep';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, TouchableOpacity, View } from 'react-native';

interface Props {
  search: string;
}

export const FavoriteRecipeTab = memo<Props>(({ search }) => {
  const router = useRouter();
  const [params, setParams] = useState<{
    cursor?: string;
    isRequested?: boolean;
    title?: string;
  }>({
    cursor: undefined,
    isRequested: true,
    title: search,
  });
  const [requestPending, setRequestPending] = useState(false);
  const [displayData, setDisplayData] = useState<SpaceRecipe[]>([]);
  const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
  const { getFavorite } = useRecipes();
  const [endReached, setEndReached] = useState(false);
  const { data, isLoading, error } = useFetchRecipes(params);
  const deleteMutation = useDeleteRecipeRequest();
  const postMutation = usePostRecipeRequest();

  const handleEndReached = async () => {
    if (isEndReachedLoading || endReached) return;
    setIsEndReachedLoading(true);
    // 2秒待機
    await sleep(2000);
    // 最後のデータのidをcursorに設定
    if (displayData.length) {
      const _cursor = displayData[displayData.length - 1]?.id;
      if (_cursor && _cursor !== params.cursor) {
        setParams((prev) => ({ ...prev, cursor: _cursor }));
      }
    }
    setIsEndReachedLoading(false);
  };

  // 「食べたい」のステートを入れ替える
  const toggleRequest = useCallback(
    async (item: SpaceRecipe) => {
      if (requestPending) return;
      setRequestPending(true);
      const isFavorite = getFavorite(item.requesters);
      if (isFavorite) {
        const result = await deleteMutation.deleteRecipeRequest(item.id);
        if (result?.data.success) {
          console.log('delete success');
          setDisplayData(displayData.filter((o) => o.id !== item.id));
        }
      }
      setRequestPending(false);
    },
    [displayData]
  );

  useEffect(() => {
    // データがなければ新規追加
    if (displayData.length === 0 && data?.recipes.length) {
      setDisplayData([...data.recipes]);
    }
    // データがあれば更新（重複は無視）
    else if (
      !!data?.recipes.length &&
      !displayData.map((o) => o.id).includes(data.recipes[0]?.id)
    ) {
      setDisplayData([...displayData, ...data.recipes]);
    }
    if (displayData.length > 0 && (!data?.recipes || data?.recipes.length < 5)) {
      setEndReached(true);
    }
  }, [data]);

  useUpdateEffect(() => {
    setDisplayData([]);
    setParams({
      cursor: undefined,
      title: search,
    });
  }, [search]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* ローディング中 */}
      {isLoading && !displayData.length ? (
        <View style={{ paddingTop: 40 }}>
          <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
        </View>
      ) : (
        <>
          {/* データがない場合 */}
          {displayData.length === 0 ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <NotoText
                style={{
                  fontSize: 14,
                  paddingTop: 40,
                  color: Constants.colors.primitive.gray[600],
                }}>
                「食べたい」に設定されたレシピがありません
              </NotoText>
            </View>
          ) : (
            <FlatList
              data={displayData}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Flex style={{ paddingVertical: 8, gap: 4 }}>
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => router.push({ pathname: `recipe/${item.id}`, params: item })}>
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
                <View style={{ paddingVertical: 12 }}>
                  {endReached ? (
                    <NotoText
                      style={{
                        fontSize: 12,
                        color: Constants.colors.primitive.gray[400],
                        textAlign: 'center',
                      }}>
                      すべてのレシピを取得しました
                    </NotoText>
                  ) : (
                    <>
                      {isEndReachedLoading ? (
                        <ActivityIndicator color={Constants.colors.primitive.gray[400]} />
                      ) : null}
                    </>
                  )}
                </View>
              )}
            />
          )}
        </>
      )}
    </View>
  );
});
