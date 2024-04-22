import { Stack, router, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { Container } from '@/cores/components/Container';
import { NotoText } from '@/cores/components/Text';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { RecipeDetail } from '@/features/Recipe/components/RecipeDetail';
import { RecipeRequest, SpaceRecipe } from '@/features/Recipe/types';
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
import { toastConfig } from '@/app/_layout';

export default function Modal() {
  const isPresented = router.canGoBack();
  const { isVisible, openModal, closeModal } = useModal();
  const { push } = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const [date, setDate] = useState<string>(new Date().toISOString());
  const params = useLocalSearchParams();
  const putMutation = usePutRecipe();
  const data = useMemo(() => {
    if (params) {
      return {
        title: params.title,
        thumbnailUrl: params.thumbnailUrl,
        imageUrls: params.imageUrls,
        memo: params.memo,
        recipeUrl: params.recipeUrl,
        faviconUrl: params.faviconUrl,
        appName: params.appName,
        spaceId: params.spaceId,
        userId: params.userId,
      } as SpaceRecipe;
    }
    return null;
  }, [params]);
  const editRecipeService = useEditRecipe(data);
  const toggleMode = useCallback(() => {
    if (isEditing) {
      handleUpdate(() => setIsEditing(false));
    } else {
      setIsEditing(true);
    }
  }, [isEditing]);

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
      console.log('isEditPending', isEditPending ? 'true' : 'false');
      if (isEditPending) return;
      if (typeof params.id === 'string') {
        setIsEditPending(true);
        console.log('call2');
        if (editRecipeService.validate()) {
          const updatedRecipe: RecipeRequest = {
            title: editRecipeService.recipeName,
            thumbnailUrl: editRecipeService.thumbnail,
            recipeUrl: editRecipeService.url,
            memo: editRecipeService.memo,
            imageUrls: editRecipeService.images,
            appName: editRecipeService.appName,
            faviconUrl: editRecipeService.faviconUrl,
          };
          // TODO: レシピURLが変わっていればOGP情報の更新
          // サムネイル
          if (editRecipeService.thumbnail.length > 0 && !isValidUrl(editRecipeService.thumbnail)) {
            const base64 = await convertImageToBase64FromUri(editRecipeService.thumbnail);
            if (base64) {
              updatedRecipe.thumbnailUrl = base64;
            }
          }
          // レシピ画像
          const imageUrls = await editRecipeService.processImages(editRecipeService.images);
          updatedRecipe.imageUrls = imageUrls;
          try {
            const response = await putMutation.putRecipe(params.id, updatedRecipe);
            if (response?.data) {
              Toast.show({
                type: 'successToast',
                text1: 'レシピを更新しました',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 60,
              });
              callback();
            }
          } catch (error) {
            console.error(error);
          }
        }
        setIsEditPending(false);
      }
    },
    [params]
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: typeof params.title === 'string' ? params.title : '',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
          headerRight: () => (
            <Flex style={{ gap: 8, alignItems: 'center' }}>
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
          <>{data && <EditRecipe {...editRecipeService} recipeUrl={data.recipeUrl} />}</>
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
  headerUpdateButton: { color: Constants.colors.primitive.blue[400], fontSize: 16 },
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
