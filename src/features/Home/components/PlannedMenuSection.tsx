import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Fragment, memo, useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { FoodRandomImage } from '@/cores/components/FoodRandomImage';
import { LinkButton } from '@/cores/components/LinkButton';
import { NotoText } from '@/cores/components/Text';
import { useFetchMenus } from '@/features/Menu/apis/getMenus';
import { MenuDetail } from '@/features/Menu/components/MenuDetail';
import { CompactMenuItem } from '@/features/Menu/components/MenuItem';
import { MenuStatus } from '@/features/Menu/types';

export const PlannedMenuSection = memo(() => {
  const router = useRouter();
  // TODO: /pendingの方が最適？
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

  const handleCloseSheet = useCallback(() => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
      setTargetId(null);
    }
  }, []);

  // 表示データ一覧
  const displayData = useMemo(() => {
    const arr = [];
    if (data?.pages) {
      for (const page of data.pages) {
        arr.push(...page.menus);
      }
    }
    // scheduledAtが今日以降のものを表示
    // scheduledAtを今日から順に並び替える
    return arr
      .filter((item) => new Date(item.scheduledAt) >= new Date())
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }, [data]);

  const targetData = useMemo(
    () => displayData.find((item) => item.id === targetId),
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
            <ActivityIndicator />
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
                      レシピを探す
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
            <MenuDetail data={targetData} onClose={handleCloseSheet} />
          </Container>
        )}
      </BottomSheetModal>
    </>
  );
});
