import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { Container } from '@/cores/components/Container';
import { Flex } from '@/cores/components/Flex';
import { ImageUploadArea } from '@/cores/components/ImageUploadArea';
import { CompactImageUploadArea } from '@/cores/components/ImageUploadArea/compact';
import { InputLabel } from '@/cores/components/InputLabel';
import { NotoText } from '@/cores/components/Text';
import { TextInput } from '@/cores/components/TextInput';
import { HeaderLeftBackButton } from '@/cores/components/icons/components/HeaderLeftBackButton';
import { useFetchMetaData } from '@/features/Recipe/apis/getMetaData';
import { useStore } from '@/store';
import { convertImageToBase64FromUri } from '@/utils/image';
import { isValidUrl } from '@/utils/validation';

export default function Modal() {
  const isPresented = router.canGoBack();
  const { slug } = useLocalSearchParams();
  const mutation = useFetchMetaData({});
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [url, setUrl] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [appName, setAppName] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [memo, setMemo] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [urlFormErrorMessage, setUrlFormErrorMessage] = useState('');
  const [recipeNameFormErrorMessage, setRecipeNameFormErrorMessage] = useState('');
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
  const selectedRecipes = useStore((state) => state.onboardingSelectedRecipeList);
  const updateSelectedRecipe = useStore((state) => state.updateOnboardingSelectedRecipeList);
  const targetRecipe = useMemo(
    () => selectedRecipes.find((recipe) => recipe.idx === Number(slug)),
    [selectedRecipes, slug]
  );
  const validate = useCallback(() => {
    setUrlFormErrorMessage('');
    setRecipeNameFormErrorMessage('');
    let returnValue = true;
    // URLかどうか
    const isUrl = isValidUrl(url);
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
  }, [recipeName, url]);
  const processImages = async (images: string[]) => {
    const imageUrls = await Promise.all(
      images.filter((image) => image.length > 0).map((image) => convertImageToBase64FromUri(image))
    );

    return imageUrls.filter((image) => image !== undefined) as string[];
  };
  const handleUpdate = useCallback(async () => {
    if (targetRecipe && validate()) {
      const newRecipe = {
        ...targetRecipe,
        thumbnailUrl: thumbnail,
        recipeUrl: url,
        title: recipeName,
        memo,
        appName,
        faviconUrl,
      };
      // レシピURLが変わっていればOGP情報の更新
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
      updateSelectedRecipe(newRecipe);
      navigation.goBack();
    }
  }, [
    images,
    memo,
    navigation,
    recipeName,
    targetRecipe,
    thumbnail,
    updateSelectedRecipe,
    url,
    validate,
    appName,
    faviconUrl,
  ]);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  useEffect(() => {
    if (targetRecipe) {
      setThumbnail(targetRecipe.thumbnailUrl);
      setUrl(targetRecipe.recipeUrl);
      setRecipeName(targetRecipe.title);
      setMemo(targetRecipe.memo);
    }
  }, [targetRecipe]);
  const fetchRecipeDataFromMetaData = useCallback(async () => {
    if (!isFocused && isValidUrl(url) && targetRecipe?.recipeUrl !== url) {
      const result = await mutation.mutateAsync(url);
      if (result) {
        const { title, thumbnailUrl, appName, faviconUrl } = result;
        if (title) setRecipeName(title);
        if (thumbnailUrl) setThumbnail(thumbnailUrl);
        if (appName) setAppName(appName);
        if (faviconUrl) setFaviconUrl(faviconUrl);
      }
    }
  }, [mutation, isFocused, url, targetRecipe?.recipeUrl]);
  useEffect(() => {
    fetchRecipeDataFromMetaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, isFocused]);
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitleStyle: { color: 'black' },
          headerShadowVisible: false,
          title: targetRecipe?.title || '',
          headerTitle: targetRecipe?.title || '',
          headerLeft: isPresented ? () => <HeaderLeftBackButton /> : undefined,
          headerRight: () => (
            <TouchableOpacity onPress={handleUpdate}>
              <NotoText fw="bold" style={styles.headerUpdateButton}>
                更新
              </NotoText>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.containerWrapper}>
        <Container>
          {/* 画像 */}
          <ImageUploadArea image={thumbnail} setImage={setThumbnail} />
          {/* レシピURL */}
          <View style={styles.inputWrapper}>
            <InputLabel>レシピURL</InputLabel>
            <TextInput
              value={url}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(text) => setUrl(text)}
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
        </Container>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 12,
  },
  memoInputWrapper: { minHeight: 90 },
  headerUpdateButton: { color: Constants.colors.primitive.blue[400], fontSize: 16 },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: Constants.colors.primitive.white['undefined'],
  },
  containerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
});
