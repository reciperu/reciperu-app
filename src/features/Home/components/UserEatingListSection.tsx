import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { FoodImage } from '@/cores/components/FoodImage';
import { LinkButton } from '@/cores/components/LinkButton';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { RecipeCard } from '@/features/Recipe/components/RecipeItem';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';
import { SpaceRecipe } from '@/features/Recipe/types';
import { noop } from '@/functions/utils';

const windowWidth = Dimensions.get('window').width;

interface Props {
  avatar?: string;
  name?: string;
  list: string[];
  loading: boolean;
  type: 'mine' | 'other';
}

const data = [
  {
    id: '1',
    title: 'ハンバーグ',
    thumbnailUrl:
      'https://recipe.r10s.jp/recipe-space/d/strg/ctrl/3/874b2417ce9cbb455d5ab3150a47f2424e9f29db.57.1.3.2.jpg?interpolation=lanczos-none&fit=around|716:716&crop=716:716;*,*',
    imageUrls: [],
    memo: '',
    recipeUrl: 'https://recipe.rakuten.co.jp/recipe/1160000135/',
    faviconUrl: 'https://recipe.rakuten.co.jp/favicon.ico',
    appName: '楽天レシピ',
  },
  {
    id: '2',
    title: '基本の肉じゃが 作り方・レシピ | クラシル',
    thumbnailUrl:
      'https://video.kurashiru.com/production/videos/82b3201b-29f4-4db9-9fbb-82a1ce16d247/compressed_thumbnail_square_large.jpg?1685351324',
    imageUrls: [],
    memo: '',
    recipeUrl: 'https://www.kurashiru.com/recipes/82b3201b-29f4-4db9-9fbb-82a1ce16d247',
    faviconUrl:
      'http://www.google.com/s2/favicons?domain=https://www.kurashiru.com/recipes/82b3201b-29f4-4db9-9fbb-82a1ce16d247',
    appName: 'クラシル',
  },
  {
    id: '3',
    title: '♪美味すぎて・・旦那が帰ってくるカレー♪ 🍛',
    thumbnailUrl: 'https://og-image.cookpad.com/recipe/507299?t=1390540832',
    imageUrls: [],
    memo: '',
    recipeUrl: 'https://cookpad.com/recipe/507299',
    faviconUrl: 'http://www.google.com/s2/favicons?domain=https://cookpad.com/recipe/507299',
    appName: 'クックパッド',
  },
];

export const UserEatingListSection = memo<Props>(({ avatar, name, list, loading, type }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const router = useRouter();

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

  const targetData = useMemo(
    () => data.find((item) => item.id === targetId) as any as SpaceRecipe,
    [targetId]
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
          {/* <ActivityIndicator color={Constants.colors.primitive.pink[400]} /> */}
          {/* データがない場合 */}
          <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <FoodImage />
            <NotoText
              style={{
                textAlign: 'center',
                fontSize: 12,
                lineHeight: 24,
                color: Constants.colors.primitive.gray[600],
              }}>
              {`食べたい料理は未登録です
食べたい料理の「」をタップしましょう`}
            </NotoText>
          </Flex>
          <Flex style={{ justifyContent: 'center', marginTop: 24 }}>
            <LinkButton onPress={() => router.push('(app)/(main)/(tabs)?route=AllRecipe')}>
              料理を探す
            </LinkButton>
          </Flex>
          {/* データがある場合 */}
          <View
            style={{
              width: windowWidth,
              height: (windowWidth * 0.6 * 9) / 16 + 64,
              position: 'relative',
            }}>
            <FlatList
              horizontal
              data={data}
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
              onPress={() => router.push('(app)/(main)/(tabs)/recipe?route=FavoriteRecipe')}>
              すべて見る
            </LinkButton>
          </Flex>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={BOTTOM_SHEET_STYLE}>
        {targetData && (
          <Container>
            <RecipeDetail data={targetData} />
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
