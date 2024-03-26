import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { useFetchRecipes } from '@/features/Recipe/apis/getRecipes';
import { RecipeItem } from '@/features/Recipe/components/RecipeItem';
import { SpaceRecipe } from '@/features/Recipe/types';
import { useUpdateEffect } from '@/hooks/useUpdateEffect';
import { sleep } from '@/utils/sleep';
import { useRouter } from 'expo-router';
import { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
  search: string;
}

export const AllRecipeTab = memo<Props>(({ search }) => {
  const router = useRouter();
  const [cursor, setCursor] = useState<string | undefined>();
  const [displayData, setDisplayData] = useState<SpaceRecipe[]>([]);
  const [isEndReachedLoading, setIsEndReachedLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const { data, isLoading, error } = useFetchRecipes(cursor);
  const handleEndReached = async () => {
    if (isEndReachedLoading || endReached) return;
    setIsEndReachedLoading(true);
    // 2秒待機
    await sleep(2000);
    // 最後のデータのidをcursorに設定
    if (displayData.length) {
      const _cursor = displayData[displayData.length - 1]?.id;
      if (_cursor && _cursor !== cursor) {
        setCursor(_cursor);
      }
    }
    setIsEndReachedLoading(false);
  };

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
                登録されたレシピがありません
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
                            item.isFavorite
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
