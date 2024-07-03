import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { BOTTOM_SHEET_STYLE, Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { InputLabel } from '@/cores/components/InputLabel';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { usePostMenu } from '@/features/Menu/apis/postMenu';
import { usePutRecipe } from '@/features/Recipe/apis/putRecipe';
import { EditRecipe } from '@/features/Recipe/components/EditRecipe';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { useEditRecipe } from '@/features/Recipe/hooks/useEdiRecipe';
import { RecipeRequestBody, SpaceRecipe } from '@/features/Recipe/types';
import { noop } from '@/functions/utils';
import { toastConfig } from '@/lib/ToastConfig';
import dayjs from '@/lib/dayjs';
import { convertImageToBase64FromUri } from '@/utils/image';
import { isValidUrl } from '@/utils/validation';

const { width, height } = Dimensions.get('window');

const Overlay = memo<{ visible: boolean; onPress: () => void }>(({ visible, onPress }) => {
  if (!visible) return null;
  return (
    <Pressable onPress={onPress} style={styles.overlay}>
      <View />
    </Pressable>
  );
});

export default function Modal() {
  const insets = useSafeAreaInsets();
  const isPresented = router.canGoBack();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const [isMenuPending, setIsMenuPending] = useState(false);
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const params = useLocalSearchParams();
  const mutation = usePutRecipe({});
  const postMenuMutation = usePostMenu({});
  const queryClient = useQueryClient();
  const [data, setData] = useState<SpaceRecipe>({
    id: params.id,
    title: params.title,
    thumbnailUrl: params.thumbnailUrl,
    imageUrls: params.imageUrls,
    memo: params.memo,
    recipeUrl: params.recipeUrl,
    faviconUrl: params.faviconUrl,
    appName: params.appName,
    spaceId: params.spaceId,
    userId: params.userId,
    user: typeof params.user === 'string' ? JSON.parse(params.user) : undefined,
    requesters: typeof params.requesters === 'string' ? JSON.parse(params.requesters) : [],
  } as SpaceRecipe);
  const editRecipeService = useEditRecipe(data);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // const confirmDelete = useCallback(() => {
  //   Alert.alert('レシピを削除しますか？', '', [
  //     {
  //       text: 'キャンセル',
  //       style: 'cancel',
  //     },
  //     {
  //       text: '削除',
  //       style: 'destructive',
  //       onPress: () => {},
  //     },
  //   ]);
  // }, []);

  const handleOpenSheet = () => {
    if (bottomSheetModalRef.current) {
      setIsSheetOpen(true);
      bottomSheetModalRef.current?.present();
    }
  };

  const handleCloseSheet = () => {
    if (bottomSheetModalRef.current) {
      setIsSheetOpen(false);
      bottomSheetModalRef.current?.close();
    }
  };

  const handleUpdate = useCallback(
    async (callback: () => void) => {
      if (isEditPending) return;
      if (typeof params.id === 'string') {
        setIsEditPending(true);
        if (editRecipeService.validate() && data) {
          const updatedRecipe: RecipeRequestBody = {
            title: editRecipeService.recipeName,
            thumbnailUrl: data.thumbnailUrl,
            recipeUrl: editRecipeService.recipeUrl,
            memo: editRecipeService.memo,
            imageUrls: data.imageUrls,
            appName: editRecipeService.appName,
            faviconUrl: editRecipeService.faviconUrl,
          };
          // レシピURLが変わっていればOGP情報の更新
          if (editRecipeService.thumbnail.length > 0 && !isValidUrl(editRecipeService.thumbnail)) {
            const base64 = await convertImageToBase64FromUri(editRecipeService.thumbnail);
            if (base64) {
              updatedRecipe.thumbnailUrl = base64;
            }
          }
          // レシピ画像
          if (editRecipeService.images.length > 0) {
            const imageUrls = await editRecipeService.processImages(editRecipeService.images);
            updatedRecipe.imageUrls = imageUrls;
          }
          try {
            // TODO: レシピ画像のアップロードが改善されたら動作確認
            mutation.mutate(
              {
                id: params.id,
                data: updatedRecipe,
              },
              {
                onSuccess: (result) => {
                  queryClient.invalidateQueries({
                    queryKey: ['recipes'],
                  });
                  Toast.show({
                    type: 'successToast',
                    text1: 'レシピを更新しました',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 0,
                  });

                  setData({
                    ...result,
                    requesters: result.requesters?.length ? result.requesters : [],
                  });
                  callback();
                },
                onError: (error) => {
                  Toast.show({
                    type: 'errorToast',
                    text1: 'エラーが発生しました',
                    text2: error instanceof AxiosError ? error.message : '',
                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 0,
                  });
                  console.error(error);
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
        }
        setIsEditPending(false);
      }
    },
    [params, data, editRecipeService, isEditPending, mutation, queryClient]
  );

  const handleAddMenu = useCallback(() => {
    if (date && !isMenuPending) {
      setIsMenuPending(true);
      postMenuMutation.mutate(
        {
          recipeId: data.id,
          scheduledAt: date.toISOString(),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['menus'],
            });
            Toast.show({
              type: 'successToast',
              text1: '献立に登録しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 0,
            });
            setDate(undefined);
            handleCloseSheet();
          },
          onSettled: () => {
            setIsMenuPending(false);
          },
        }
      );
    }
  }, [data, date, isMenuPending, postMenuMutation, queryClient]);

  const toggleMode = useCallback(() => {
    if (isEditing) {
      handleUpdate(() => setIsEditing(false));
    } else {
      setIsEditing(true);
    }
  }, [isEditing, handleUpdate]);

  return (
    <BottomSheetModalProvider>
      <Stack.Screen
        options={{
          title: typeof data.title === 'string' ? data.title : '',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented
            ? () => <HeaderLeftBackButton onPress={() => router.push('/recipe')} />
            : undefined,
          headerRight: () => (
            <Flex
              style={{
                gap: 8,
                alignItems: 'center',
                width: 60,
                justifyContent: 'flex-end',
              }}>
              {isEditPending && <ActivityIndicator color={Constants.colors.primitive.blue[400]} />}
              <TouchableOpacity onPress={toggleMode}>
                <NotoText fw="bold" style={styles.headerUpdateButton}>
                  {isEditing ? '保存' : '編集'}
                </NotoText>
              </TouchableOpacity>
            </Flex>
          ),
        }}
      />
      <Container>
        {isEditing ? (
          <>{data && <EditRecipe {...editRecipeService} oldRecipeUrl={data.recipeUrl} />}</>
        ) : data ? (
          <View style={{ flex: 1 }}>
            <RecipeDetail data={data} />
            <Spacer />
            <Button variant="primary" onPress={handleOpenSheet}>
              献立にする
            </Button>
            {/* // TODO: v1では削除 */}
            {/* <View style={{ marginTop: 12 }}>
              <Button variant="primary" scheme="text" onPress={confirmDelete}>
                レシピを削除
              </Button>
            </View> */}
          </View>
        ) : null}
      </Container>
      <Overlay visible={isSheetOpen} onPress={handleCloseSheet} />
      <BottomSheetModal
        onDismiss={() => handleCloseSheet()}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={[320]}
        style={{ ...BOTTOM_SHEET_STYLE, zIndex: 999 }}>
        <BottomSheetView
          style={{
            paddingHorizontal: 16,
            paddingTop: 8,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <NotoText fw="bold" style={{ fontSize: 14, textAlign: 'center' }}>
            献立に設定
          </NotoText>
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
            <Button onPress={handleAddMenu} disabled={date === undefined} loading={isMenuPending}>
              決定
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <Toast config={toastConfig} />
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
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  headerUpdateButton: {
    color: Constants.colors.primitive.blue[400],
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width,
    height,
    zIndex: 0,
  },
});
