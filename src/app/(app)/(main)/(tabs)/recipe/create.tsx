import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Stack, router, useNavigation } from 'expo-router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { Flex } from '@/cores/components/Flex';
import { ImageUploadArea } from '@/cores/components/ImageUploadArea';
import { CompactImageUploadArea } from '@/cores/components/ImageUploadArea/compact';
import { InputLabel } from '@/cores/components/InputLabel';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { useFetchMetaData } from '@/features/Recipe/apis/getMetaData';
import { PostRecipeRequestBody, usePostRecipe } from '@/features/Recipe/apis/postRecipe';
import { convertImageToBase64FromUri } from '@/utils/image';
import { isValidUrl } from '@/utils/validation';

export default function RecipeCreatePage() {
  const isPresented = router.canGoBack();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [isCreatePending, setIsCreatePending] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [recipeUrl, setRecipeUrl] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [appName, setAppName] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [memo, setMemo] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [urlFormErrorMessage, setUrlFormErrorMessage] = useState('');
  const [recipeNameFormErrorMessage, setRecipeNameFormErrorMessage] = useState('');
  const mutation = useFetchMetaData({});
  const postRecipeMutation = usePostRecipe({});
  const [isFocused, setIsFocused] = useState(false);

  // バリデーション
  const validate = useCallback(() => {
    setUrlFormErrorMessage('');
    setRecipeNameFormErrorMessage('');
    let returnValue = true;
    // URLかどうか
    const isUrl = isValidUrl(recipeUrl);
    if (!isUrl) {
      setUrlFormErrorMessage('URLの形式が正しくありません');
      returnValue = false;
    }
    // 料理名が入力されているかどうか
    if (!recipeName.trim()) {
      setRecipeNameFormErrorMessage('料理名を入力してください');
      returnValue = false;
    }
    return returnValue;
  }, [recipeName, recipeUrl]);

  // 画像の処理
  const processImages = useCallback(async (images: string[]) => {
    const imageUrls = await Promise.all(
      images.filter((image) => image.length > 0).map((image) => convertImageToBase64FromUri(image))
    );

    return imageUrls.filter((image) => image !== undefined) as string[];
  }, []);

  // レシピ画像の更新
  const updateRecipeImage = (image: string, idx: number) => {
    let newImages = [...images];
    newImages[idx] = image;
    if (images.length < Validation.RECIPE_IMAGES.COUNT.VALUE && idx === images.length - 1) {
      newImages = [...newImages, ''];
    }
    setImages(newImages);
  };
  // レシピ画像の削除
  const deleteRecipeImage = (idx: number) => {
    const newImages = images.filter((_, i) => i !== idx);
    setImages([...newImages, '']);
  };

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const fetchRecipeDataFromMetaData = useCallback(async () => {
    if (!isFocused && isValidUrl(recipeUrl)) {
      const result = await mutation.mutateAsync(recipeUrl);
      if (result) {
        const { title, thumbnailUrl, appName, faviconUrl } = result;
        if (title) setRecipeName(title);
        if (thumbnailUrl) setThumbnail(thumbnailUrl);
        if (appName) setAppName(appName);
        if (faviconUrl) setFaviconUrl(faviconUrl);
      }
    }
  }, [mutation, isFocused, recipeUrl, setRecipeName, setThumbnail, setAppName, setFaviconUrl]);

  const handleCreate = useCallback(async () => {
    if (isCreatePending) return;
    if (validate()) {
      setIsCreatePending(true);
      const newRecipe: PostRecipeRequestBody = {
        thumbnailUrl: thumbnail,
        recipeUrl,
        title: recipeName,
        memo,
        imageUrls: [],
        appName,
        faviconUrl,
      };
      if (thumbnail.length > 0 && !isValidUrl(thumbnail)) {
        const base64 = await convertImageToBase64FromUri(thumbnail);
        if (base64) {
          newRecipe.thumbnailUrl = base64;
        }
      }
      // レシピ画像
      if (images.length > 0) {
        const imageUrls = await processImages(images);
        newRecipe.imageUrls = imageUrls;
      }
      try {
        postRecipeMutation.mutate(newRecipe, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['recipes'],
            });
            Toast.show({
              type: 'successToast',
              text1: 'レシピを更新しました',
              visibilityTime: 3000,
              autoHide: true,
              topOffset: 60,
            });
            navigation.goBack();
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
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsCreatePending(false);
      }
    }
  }, [
    images,
    memo,
    navigation,
    recipeName,
    thumbnail,
    validate,
    appName,
    faviconUrl,
    recipeUrl,
    processImages,
    postRecipeMutation,
    queryClient,
    isCreatePending,
  ]);

  useEffect(() => {
    fetchRecipeDataFromMetaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeUrl, isFocused]);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'レシピの追加',
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
              {isCreatePending && (
                <ActivityIndicator color={Constants.colors.primitive.blue[400]} />
              )}
              <TouchableOpacity onPress={handleCreate}>
                <NotoText fw="bold" style={styles.headerUpdateButton}>
                  登録
                </NotoText>
              </TouchableOpacity>
            </Flex>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        {/* 画像 */}
        <ImageUploadArea image={thumbnail} setImage={setThumbnail} />
        {/* レシピURL */}
        <View style={styles.inputWrapper}>
          <InputLabel>レシピURL</InputLabel>
          <TextInput
            value={recipeUrl}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(text) => setRecipeUrl(text)}
            errorMessage={urlFormErrorMessage}
            description="レシピサイト、Instagram、YouTubeなどのURL"
          />
        </View>
        {/* レシピ画像 */}
        <View style={styles.inputWrapper}>
          <InputLabel>レシピ画像（最大{Validation.RECIPE_IMAGES.COUNT.VALUE}枚）</InputLabel>
          <Flex style={{ gap: 12 }}>
            {images.map((image, idx) => (
              <Fragment key={idx}>
                <CompactImageUploadArea
                  image={image}
                  setImage={(image) => updateRecipeImage(image, idx)}
                  deleteImage={() => deleteRecipeImage(idx)}
                />
              </Fragment>
            ))}
          </Flex>
        </View>
        {/* 料理名 */}
        <View style={styles.inputWrapper}>
          <InputLabel required>料理名</InputLabel>
          <TextInput
            value={recipeName}
            onChange={(text) => setRecipeName(text)}
            errorMessage={recipeNameFormErrorMessage}
            maxLength={Validation.RECIPE_NAME.MAX_LENGTH.VALUE}
          />
        </View>
        {/* メモ */}
        <View style={styles.inputWrapper}>
          <InputLabel>メモ</InputLabel>
          <TextInput
            value={memo}
            multiline
            numberOfLines={3}
            onChange={(text) => setMemo(text)}
            maxLength={Validation.RECIPE_MEMO.MAX_LENGTH.VALUE}
            style={styles.memoInputWrapper}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerUpdateButton: { color: Constants.colors.primitive.blue[400], fontSize: 16 },
  container: { flex: 1, position: 'relative', backgroundColor: 'white', paddingHorizontal: 16 },
  inputWrapper: {
    paddingVertical: 12,
    width: Dimensions.get('window').width - 32,
  },
  memoInputWrapper: { minHeight: 90 },
  containerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
