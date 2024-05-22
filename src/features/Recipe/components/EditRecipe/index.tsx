import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { useFetchMetaData } from '../../apis/getMetaData';
import { RecipeForm } from '../../hooks/useEdiRecipe';

import { Constants } from '@/constants';
import { Validation } from '@/constants/validation';
import { Flex } from '@/cores/components/Flex';
import { ImageUploadArea } from '@/cores/components/ImageUploadArea';
import { CompactImageUploadArea } from '@/cores/components/ImageUploadArea/compact';
import { InputLabel } from '@/cores/components/InputLabel';
import { TextInput } from '@/cores/components/TextInput';
import { isValidUrl } from '@/utils/validation';

interface Props extends RecipeForm {
  oldRecipeUrl: string;
}

export const EditRecipe = memo<Props>(
  ({
    thumbnail,
    setThumbnail,
    recipeUrl,
    setRecipeUrl,
    recipeName,
    setRecipeName,
    setAppName,
    setFaviconUrl,
    memo,
    setMemo,
    images,
    setImages,
    urlFormErrorMessage,
    recipeNameFormErrorMessage,
    oldRecipeUrl,
  }) => {
    const mutation = useFetchMetaData({});
    const [isFocused, setIsFocused] = useState(false);

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
      if (!isFocused && isValidUrl(recipeUrl) && recipeUrl !== oldRecipeUrl) {
        const result = await mutation.mutateAsync(recipeUrl);
        if (result) {
          const { title, thumbnailUrl, appName, faviconUrl } = result;
          if (title) setRecipeName(title);
          if (thumbnailUrl) setThumbnail(thumbnailUrl);
          if (appName) setAppName(appName);
          if (faviconUrl) setFaviconUrl(faviconUrl);
        }
      }
    }, [mutation, isFocused, recipeUrl]);
    useEffect(() => {
      fetchRecipeDataFromMetaData();
    }, [recipeUrl, isFocused]);
    return (
      <ScrollView>
        <View style={styles.containerWrapper}>
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
        </View>
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 12,
    width: Dimensions.get('window').width - 32,
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
  },
});
