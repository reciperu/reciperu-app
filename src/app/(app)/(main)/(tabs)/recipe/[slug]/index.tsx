import { Stack, router, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { Container } from '@/cores/components/Container';
import { NotoText } from '@/cores/components/Text';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { RecipeRequestBody, SpaceRecipe } from '@/features/Recipe/types';
import { Spacer } from '@/cores/components/Spacer';
import { Button } from '@/cores/components/Button';
import { AppModal } from '@/cores/components/Modal';
import { useModal } from '@/cores/components/Modal/useModal';
import { InputLabel } from '@/cores/components/InputLabel';
import { TextInput } from '@/cores/components/TextInput';
import { EditRecipe } from '@/features/Recipe/components/EditRecipe';
import { usePutRecipe } from '@/features/Recipe/apis/putRecipe';
import { Flex } from '@/cores/components/Flex';
import { useEditRecipe } from '@/features/Recipe/hooks/useEdiRecipe';
import { convertImageToBase64FromUri } from '@/utils/image';
import { isValidUrl } from '@/utils/validation';
import { useStore } from '@/store';
import { toastConfig } from '@/lib/ToastConfig';
import { useQueryClient } from '@tanstack/react-query';

export default function Modal() {
  const isPresented = router.canGoBack();
  const { isVisible, openModal, closeModal } = useModal();
  const { push } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const params = useLocalSearchParams();
  const mutation = usePutRecipe({});
  const queryClient = useQueryClient();
  const setNeedUpdate = useStore((state) => state.setNeedUpdate);
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
    requesters: typeof params.requesters === 'string' ? JSON.parse(params.requesters) : [],
  } as SpaceRecipe);
  const editRecipeService = useEditRecipe(data);

  const confirmDelete = useCallback(() => {
    Alert.alert('レシピを削除しますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          console.log('削除');
        },
      },
    ]);
  }, []);

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
                    ...result.data,
                    requesters: result.data.requesters?.length ? result.data.requesters : [],
                  });
                  setNeedUpdate(true);
                  callback();
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
    [params, data, editRecipeService, isEditPending, mutation]
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
            <Button
              onPress={() =>
                push({
                  pathname: `recipe/${params.slug}/webview`,
                  params: { title: params.title, recipeUrl: params.recipeUrl },
                })
              }>
              レシピを見る
            </Button>
            <View style={{ marginTop: 10 }}>
              <Button variant="primary" scheme="text" onPress={openModal}>
                献立にする
              </Button>
            </View>
            <Button variant="primary" scheme="text" onPress={confirmDelete}>
              レシピを削除
            </Button>
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
