import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Fragment, memo, useMemo, useRef } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Flex } from '@/cores/components/Flex';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { AppIcon } from '@/cores/components/icons';
import { CompactRecipeItem } from '@/features/Recipe/components/RecipeItem';

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
];

export const TodayMenuSection = memo(() => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['92%'], []);

  const handleOpenSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.present();
    }
  };

  const handleCloseSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current?.close();
    }
  };

  return (
    <>
      <View>
        <Flex style={{ gap: 8, alignItems: 'center' }}>
          <Image
            source={require('assets/menu_section_icon.svg')}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
          <NotoText fw="bold" style={{ fontSize: 14, lineHeight: 24 }}>
            今日の献立
          </NotoText>
          <Spacer />
          <Pressable>
            <Flex style={{ gap: 4, alignItems: 'center' }}>
              <Text
                style={{
                  color: Constants.colors.primitive.blue[400],
                  fontSize: 12,
                  textDecorationLine: 'underline',
                }}>
                すべての献立を見る
              </Text>
              <View style={{ transform: 'rotate(180deg)' }}>
                <AppIcon
                  name="arrow-back"
                  color={Constants.colors.primitive.blue[400]}
                  width={12}
                  height={12}
                />
              </View>
            </Flex>
          </Pressable>
        </Flex>
        <View style={{ paddingVertical: 16 }}>
          {/* 取得中 */}
          {/* <ActivityIndicator color={Constants.colors.primitive.pink[400]} /> */}
          {/* データがない場合 */}
          <Flex style={{ flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <AppIcon
              name="emoji-sad"
              width={20}
              height={20}
              color={Constants.colors.primitive.gray[400]}
            />
            <NotoText
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: Constants.colors.primitive.gray[600],
              }}>
              {`食べたい料理は未登録です
      に登録された料理から食べたい料理を選びましょう`}
            </NotoText>
          </Flex>
          {/* データがある場合 */}
          <Flex style={{ flexDirection: 'column', gap: 12, marginTop: 16 }}>
            {data.map((item) => (
              <Fragment key={item.id}>
                <Pressable onPress={() => handleOpenSheet()}>
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
        <Text>aaa</Text>
      </BottomSheetModal>
    </>
  );
});
