import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { Button } from '@/cores/components/Button';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { InputLabel } from '@/cores/components/InputLabel';
import { AppModal } from '@/cores/components/Modal';
import { useModal } from '@/cores/components/Modal/useModal';
import { Spacer } from '@/cores/components/Spacer';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { usePutRecipe } from '@/features/Recipe/apis/putRecipe';
import { EditRecipe } from '@/features/Recipe/components/EditRecipe';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { useEditRecipe } from '@/features/Recipe/hooks/useEdiRecipe';
import { RecipeRequestBody, SpaceRecipe } from '@/features/Recipe/types';
import { toastConfig } from '@/lib/ToastConfig';
import { convertImageToBase64FromUri } from '@/utils/image';
import { isValidUrl } from '@/utils/validation';

export default function Modal() {
  const isPresented = router.canGoBack();
  const { isVisible, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const params = useLocalSearchParams();
  const mutation = usePutRecipe({});
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

                  console.log(JSON.stringify(result, null, 2));

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

  const toggleMode = useCallback(() => {
    if (isEditing) {
      handleUpdate(() => setIsEditing(false));
    } else {
      setIsEditing(true);
    }
  }, [isEditing, handleUpdate]);

  return (
    <>
      <Stack.Screen
        options={{
          title: typeof data.title === 'string' ? data.title : '',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
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
            <Button variant="primary" onPress={openModal}>
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
      <AppModal
        isVisible={isVisible}
        close={closeModal}
        title={
          <NotoText fw="bold" style={{ fontSize: 14 }}>
            献立に設定
          </NotoText>
        }>
        <View>
          <InputLabel required>食べる日</InputLabel>
          <TextInput
            value={date}
            onChange={(text) => setDate(text)}
            // errorMessage={emailFormErrorMessage}
          />
          <NotoText
            style={{
              fontSize: 12,
              color: Constants.colors.primitive.gray[600],
              marginTop: 4,
              marginBottom: 40,
            }}>
            後で設定・変更することができます
          </NotoText>
          <Button onPress={closeModal}>決定</Button>
        </View>
      </AppModal>
      <Toast config={toastConfig} />
    </>
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
});
