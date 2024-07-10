import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useMemo } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Pressable, View } from 'react-native';

import { Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { FoodRandomImage } from '@/cores/components/FoodRandomImage';
import { LinkButton } from '@/cores/components/LinkButton';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { useFetchRecipes } from '@/features/Recipe/apis/getRecipes';
import { RecipeCard } from '@/features/Recipe/components/RecipeItem';

const windowWidth = Dimensions.get('window').width;

interface Props {
  avatar?: string;
  name?: string;
}

export const UserEatingListSection = memo<Props>(({ avatar, name }) => {
  const router = useRouter();
  const { data, isFetching } = useFetchRecipes({
    params: {
      isRequested: true,
    },
  });

  // 表示データ一覧
  const displayData = useMemo(() => {
    const arr = [];
    if (data?.pages) {
      for (const page of data.pages) {
        arr.push(...page.recipes);
      }
    }
    return arr.slice(0, 5);
  }, [data]);

  if (!avatar || !name) return null;
  return (
    <>
      <View>
        <Flex style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={avatar}
            style={{ width: 24, height: 24, borderRadius: 12 }}
            contentFit="contain"
          />
          <NotoText fw="bold" style={{ fontSize: 16, lineHeight: 24 }}>
            あなたの食べたい料理
          </NotoText>
        </Flex>
        <View style={{ paddingVertical: 16 }}>
          {/* 取得中 */}
          {isFetching ? (
            <ActivityIndicator color={Constants.colors.primitive.pink[400]} />
          ) : (
            <>
              {displayData.length === 0 ? (
                // データがない場合
                <>
                  <Flex
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 16,
                    }}>
                    <FoodRandomImage />
                    <NotoText
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        lineHeight: 24,
                        color: Constants.colors.primitive.gray[600],
                      }}>
                      {`食べたい料理は未登録です
食べたい料理の`}
                      <View style={{ paddingHorizontal: 4, marginTop: -2 }}>
                        <AppIcon name="bookmark" width={20} height={20} />
                      </View>
                      をタップしましょう
                    </NotoText>
                  </Flex>
                  <Flex style={{ justifyContent: 'center', marginTop: 24 }}>
                    <LinkButton
                      onPress={() => router.push('(app)/(main)/(tabs)/recipe?route=AllRecipe')}>
                      料理を探す
                    </LinkButton>
                  </Flex>
                </>
              ) : (
                // データがある場合
                <>
                  <View
                    style={{
                      width: windowWidth,
                      height: (windowWidth * 0.6 * 9) / 16 + 64,
                      position: 'relative',
                      marginTop: 16,
                    }}>
                    <FlatList
                      horizontal
                      data={displayData}
                      renderItem={({ item }) => (
                        <View style={{ paddingLeft: 16 }}>
                          <Pressable
                            onPress={() =>
                              router.push({
                                pathname: `recipe/${item.id}`,
                                params: {
                                  ...item,
                                  imageUrls: JSON.stringify(item.imageUrls),
                                  requesters: JSON.stringify(item.requesters),
                                  user: JSON.stringify(item.user),
                                },
                              })
                            }>
                            <RecipeCard data={item} />
                          </Pressable>
                        </View>
                      )}
                      keyExtractor={(item) => item.id}
                      contentContainerStyle={{ paddingBottom: 16, paddingRight: 16 }}
                      style={{ position: 'absolute', top: 0, left: -16 }}
                    />
                  </View>
                  <Flex style={{ justifyContent: 'center', marginTop: 40 }}>
                    <LinkButton
                      onPress={() =>
                        router.push('(app)/(main)/(tabs)/recipe?route=FavoriteRecipe')
                      }>
                      すべて見る
                    </LinkButton>
                  </Flex>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
});
