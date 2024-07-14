import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { NotoText } from '@/cores/components/Text';
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
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const params = useLocalSearchParams();
  const mutation = usePutRecipe({});
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [data, setData] = useState<SpaceRecipe>({
    id: params.id,
    title: params.title,
    thumbnailUrl: params.thumbnailUrl,
    imageUrls: typeof params.imageUrls === 'string' ? JSON.parse(params.imageUrls) : [],
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
            updatedRecipe.imageUrls = editRecipeService.images.filter((img) => img !== '');
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
                onSettled: () => {
                  setIsEditPending(false);
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
        }
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

  const renderHeaderRight = useCallback(() => {
    return (
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
    );
  }, [isEditing, isEditPending, toggleMode]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => renderHeaderRight(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, isEditPending]);

  return (
    <>
      <Stack.Screen
        options={{
          title: typeof data.title === 'string' ? data.title : '',
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
          headerRight: () => renderHeaderRight(),
        }}
      />

      <Container needBottomPadding={!isEditing}>
        {isEditing ? (
          <>
            {data && (
              <ScrollView>
                <EditRecipe {...editRecipeService} oldRecipeUrl={data.recipeUrl} />
              </ScrollView>
            )}
          </>
        ) : data ? (
          <View style={{ flex: 1 }}>
            <RecipeDetail data={data} />
          </View>
        ) : null}
      </Container>
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
  },
});
