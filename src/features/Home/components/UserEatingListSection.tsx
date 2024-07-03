import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Pressable, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { FoodRandomImage } from '@/cores/components/FoodRandomImage';
import { InputLabel } from '@/cores/components/InputLabel';
import { LinkButton } from '@/cores/components/LinkButton';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { AppIcon } from '@/cores/components/icons';
import { usePostMenu } from '@/features/Menu/apis/postMenu';
import { useFetchRecipes } from '@/features/Recipe/apis/getRecipes';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { RecipeCard } from '@/features/Recipe/components/RecipeItem';
import { RecipeWebviewLink } from '@/features/Recipe/components/RecipeWebViewLink';
import { SpaceRecipe } from '@/features/Recipe/types';
import { noop } from '@/functions/utils';
import dayjs from '@/lib/dayjs';

const windowWidth = Dimensions.get('window').width;

interface Props {
  avatar?: string;
  name?: string;
  list: string[];
  loading: boolean;
  type: 'mine' | 'other';
}

export const UserEatingListSection = memo<Props>(({ avatar, name, list, loading, type }) => {
  const insets = useSafeAreaInsets();
  const postMenuMutation = usePostMenu({});
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [bottomSheetMode, setBottomSheetMode] = useState<'detail' | 'add_menu'>('detail');
  const snapPoints = useMemo(() => {
    if (bottomSheetMode === 'add_menu') return [320];
    return ['80%'];
  }, [bottomSheetMode]);
  const router = useRouter();
  const { data, isFetching } = useFetchRecipes({
    params: {
      isRequested: true,
    },
  });

  const [targetId, setTargetId] = useState<string | null>(null);

  const handleOpenSheet = (id: string) => {
    if (bottomSheetModalRef.current) {
      setBottomSheetMode('detail');
      bottomSheetModalRef.current?.present();
      setTargetId(id);
    }
  };

  const handleCloseSheet = () => {
    if (bottomSheetModalRef.current) {
      setBottomSheetMode('detail');
      bottomSheetModalRef.current?.close();
      setTargetId(null);
      setDate(undefined);
    }
  };

  const handleAddMenu = useCallback(() => {
    if (date && targetId) {
      postMenuMutation.mutate(
        {
          recipeId: targetId,
          scheduledAt: date.toISOString(),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['menus'],
            });
            queryClient.invalidateQueries({
              queryKey: ['pending-menus'],
            });
            Toast.show({
              type: 'successToast',
              text1: '献立に登録しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
            setDate(undefined);
            handleCloseSheet();
          },
        }
      );
    }
  }, [date, postMenuMutation, queryClient, targetId]);

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
            {bottomSheetMode === 'detail' && (
              <>
                <RecipeDetail data={targetData} showRecipeDetail={false} />
                <Spacer />
                <Button onPress={() => setBottomSheetMode('add_menu')}>献立として登録</Button>
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
              </>
            )}
            {bottomSheetMode === 'add_menu' && (
              <>
                <View style={{ position: 'absolute', left: 16, top: 8 }}>
                  <Pressable onPress={() => setBottomSheetMode('detail')}>
                    <Flex style={{ alignItems: 'center', gap: 4 }}>
                      <AppIcon name="arrow-back" width={16} height={16} />
                      <NotoText
                        style={{ color: Constants.colors.primitive.pink[400], fontSize: 12 }}>
                        戻る
                      </NotoText>
                    </Flex>
                  </Pressable>
                </View>
                <Flex style={{ justifyContent: 'center', marginVertical: 8 }}>
                  <NotoText fw="bold">献立の設定</NotoText>
                </Flex>
                <View style={{ marginTop: 8, flex: 1, paddingBottom: insets.bottom }}>
                  <InputLabel required>食べる日</InputLabel>
                  <Pressable onPress={() => setOpen(true)}>
                    <TextInput
                      value={date ? dayjs(date).format('YYYY/M/D') : ''}
                      placeholder="YYYY/MM/DD"
                      onChange={noop}
                      readOnly
                    />
                  </Pressable>
                  <NotoText
                    style={{
                      fontSize: 12,
                      color: Constants.colors.primitive.gray[600],
                      marginTop: 4,
                      marginBottom: 40,
                    }}>
                    後で設定・変更することができます
                  </NotoText>
                  <Spacer />
                  <Button
                    onPress={handleAddMenu}
                    disabled={date === undefined}
                    loading={postMenuMutation.isPending}>
                    決定
                  </Button>
                </View>
              </>
            )}
          </Container>
        )}
      </BottomSheetModal>
      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        minimumDate={new Date()}
        title="食べる日を選択してください"
        confirmText="決定"
        cancelText="キャンセル"
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
});
