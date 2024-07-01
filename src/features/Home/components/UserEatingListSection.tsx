import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Pressable, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { FoodRandomImage } from '@/cores/components/FoodRandomImage';
import { LinkButton } from '@/cores/components/LinkButton';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { RecipeCard } from '@/features/Recipe/components/RecipeItem';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';
import { SpaceRecipe } from '@/features/Recipe/types';
import { noop } from '@/functions/utils';
import { useFetchRecipes } from '@/features/Recipe/apis/getRecipes';

const windowWidth = Dimensions.get('window').width;

interface Props {
  avatar?: string;
  name?: string;
  list: string[];
  loading: boolean;
  type: 'mine' | 'other';
}

export const UserEatingListSection = memo<Props>(({ avatar, name, list, loading, type }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const router = useRouter();
  const { data, error, isFetching } = useFetchRecipes({
    params: {
      isRequested: true,
    },
  });

  const [targetId, setTargetId] = useState<string | null>(null);

  const handleOpenSheet = (id: string) => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
      setTargetId(id);
    }
  };

  const handleCloseSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.close();
      setTargetId(null);
    }
  };

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

  const targetData = useMemo(
    () => displayData.find((item) => item.id === targetId) as any as SpaceRecipe,
    [targetId, displayData]
  );

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
                          <Pressable onPress={() => handleOpenSheet(item.id)}>
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={BOTTOM_SHEET_STYLE}>
        {targetData && (
          <Container>
            <RecipeDetail data={targetData} showRecipeDetail={false} />
            <Spacer />
            <Button onPress={noop}>この料理を献立にする</Button>
            <View style={{ marginTop: 8 }}>
              <RecipeWebviewLink
                id={targetData.id}
                recipeUrl={targetData.recipeUrl}
                title={targetData.title}>
                <Button variant="primary" scheme="text">
                  レシピを見る
                </Button>
              </RecipeWebviewLink>
            </View>
          </Container>
        )}
      </BottomSheetModal>
    </>
  );
});
