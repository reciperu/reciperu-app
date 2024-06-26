import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Fragment, memo, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { FoodRandomImage } from '@/cores/components/FoodRandomImage';
import { LinkButton } from '@/cores/components/LinkButton';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { useFetchMenus } from '@/features/Menu/apis/getMenus';
import { CompactMenuItem } from '@/features/Menu/components/MenuItem';
import { MenuStatus } from '@/features/Menu/types';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';
import { SpaceRecipe } from '@/features/Recipe/types';
import { noop } from '@/functions/utils';

export const PlannedMenuSection = memo(() => {
  const router = useRouter();
  const { data, isFetching } = useFetchMenus({
    params: {
      statuses: [MenuStatus.PENDING],
    },
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  const [targetId, setTargetId] = useState<string | null>(null);

  const handleOpenSheet = (id: string) => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
      setTargetId(id);
    }
  };

  // 表示データ一覧
  const displayData = useMemo(() => {
    const arr = [];
    if (data?.pages) {
      for (const page of data.pages) {
        arr.push(...page.menus);
      }
    }
    return arr.slice(0, 5);
  }, [data]);

  const targetData = useMemo(
    () => displayData.find((item) => item.id === targetId) as any as SpaceRecipe,
    [targetId, displayData]
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
          {isFetching ? (
            <ActivityIndicator color={Constants.colors.primitive.pink[400]} />
          ) : (
            <>
              {/* // データがある場合 */}
              {displayData.length === 0 ? (
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
                      {`計画中の献立はありません
レシピに登録された料理から献立を設定しましょう`}
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
                  <Flex style={{ flexDirection: 'column', gap: 16, marginTop: 24 }}>
                    {displayData.map((item) => (
                      <Fragment key={item.id}>
                        <Pressable onPress={() => handleOpenSheet(item.id)}>
                          <CompactMenuItem data={item} />
                        </Pressable>
                      </Fragment>
                    ))}
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
