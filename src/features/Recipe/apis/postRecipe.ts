import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { Recipe } from '../types';

import { client } from '@/lib/axios';

export interface PostRecipeRequestBody {
  title: string;
  thumbnailUrl: string;
  imageUrls: string[];
  memo: string;
  recipeUrl: string;
  faviconUrl: string;
  appName: string;
}

interface PostRecipeResponse extends Recipe {}

export const postRecipe = async (data: PostRecipeRequestBody): Promise<PostRecipeResponse> => {
  return await client.post('/recipes', data);
};

type UsePostRecipe = {
  config?: UseMutationOptions<PostRecipeResponse, unknown, PostRecipeRequestBody, unknown>;
};

export const usePostRecipe = ({ config }: UsePostRecipe) => {
  return useMutation({
    ...config,
    mutationFn: postRecipe,
  });
};
