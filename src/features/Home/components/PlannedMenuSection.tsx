import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Fragment, memo, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { FoodImage } from '@/cores/components/FoodImage';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { CompactRecipeItem } from '@/features/Recipe/components/RecipeItem';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';
import { SpaceRecipe } from '@/features/Recipe/types';
import { noop } from '@/functions/utils';
import { LinkButton } from '@/cores/components/LinkButton';
import { useRouter } from 'expo-router';

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
    requesters: [],
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
    requesters: [],
  },
];

export const PlannedMenuSection = memo(() => {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  const [targetId, setTargetId] = useState<string | null>(null);

  const handleOpenSheet = (id: string) => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
      setTargetId(id);
    }
  };

  const handleCloseSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.close();
      setTargetId(null);
    }
  };

  const targetData = useMemo(
    () => data.find((item) => item.id === targetId) as any as SpaceRecipe,
    [targetId]
  );

  return (
    <>
      <View>
        <Flex style={{ gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('assets/menu_section_icon.svg')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <NotoText fw="bold" style={{ fontSize: 16, lineHeight: 24 }}>
            計画中の献立
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
              {`計画中の献立はありません
レシピに登録された料理から献立を設定しましょう`}
            </NotoText>
          </Flex>
          <Flex style={{ justifyContent: 'center', marginTop: 24 }}>
            <LinkButton onPress={() => router.push('(app)/(main)/(tabs)/recipe?route=AllRecipe')}>
              料理を探す
            </LinkButton>
          </Flex>
          {/* データがある場合 */}
          <Flex style={{ flexDirection: 'column', gap: 16, marginTop: 24 }}>
            {data.map((item) => (
              <Fragment key={item.id}>
                <Pressable onPress={() => handleOpenSheet(item.id)}>
                  <CompactRecipeItem data={item} />
                </Pressable>
              </Fragment>
            ))}
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
            <Button onPress={noop}>献立から削除</Button>
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
