import { useCallback, useState } from 'react';

import { SpaceRecipe } from '../types';

import { useStore } from '@/store';
import { convertImageToBase64FromUri } from '@/utils/image';
import { isValidUrl } from '@/utils/validation';

export interface RecipeForm {
  thumbnail: string;
  setThumbnail: (thumbnail: string) => void;
  recipeUrl: string;
  setRecipeUrl: (url: string) => void;
  recipeName: string;
  setRecipeName: (recipeName: string) => void;
  appName: string;
  setAppName: (appName: string) => void;
  faviconUrl: string;
  setFaviconUrl: (faviconUrl: string) => void;
  memo: string;
  setMemo: (memo: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
  urlFormErrorMessage: string;
  setUrlFormErrorMessage: (urlFormErrorMessage: string) => void;
  recipeNameFormErrorMessage: string;
  setRecipeNameFormErrorMessage: (recipeNameFormErrorMessage: string) => void;
  validate: () => boolean;
  processImages: (images: string[]) => Promise<string[]>;
}

export type UseEditRecipe = (data: SpaceRecipe | null) => RecipeForm;

export const useEditRecipe: UseEditRecipe = (data) => {
  const [thumbnail, setThumbnail] = useState(data?.thumbnailUrl || '');
  const [recipeUrl, setRecipeUrl] = useState(data?.recipeUrl || '');
  const [recipeName, setRecipeName] = useState(data?.title || '');
  const [appName, setAppName] = useState(data?.appName || '');
  const [faviconUrl, setFaviconUrl] = useState(data?.faviconUrl || '');
  const [memo, setMemo] = useState(data?.memo || '');
  const [images, setImages] = useState<string[]>(data?.imageUrls?.length ? data.imageUrls : ['']);
  const [urlFormErrorMessage, setUrlFormErrorMessage] = useState('');
  const [recipeNameFormErrorMessage, setRecipeNameFormErrorMessage] = useState('');
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

  const processImages = async (images: string[]) => {
    const imageUrls = await Promise.all(
      images.filter((image) => image.length > 0).map((image) => convertImageToBase64FromUri(image))
    );

    return imageUrls.filter((image) => image !== undefined) as string[];
  };
  return {
    thumbnail,
    setThumbnail,
    recipeUrl,
    setRecipeUrl,
    recipeName,
    setRecipeName,
    appName,
    setAppName,
    faviconUrl,
    setFaviconUrl,
    memo,
    setMemo,
    images,
    setImages,
    urlFormErrorMessage,
    setUrlFormErrorMessage,
    recipeNameFormErrorMessage,
    setRecipeNameFormErrorMessage,
    validate,
    processImages,
  };
};
