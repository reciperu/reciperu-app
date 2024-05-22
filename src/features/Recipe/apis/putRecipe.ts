import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { RecipeRequestBody, SpaceRecipe } from '../types';

import { client } from '@/lib/axios';

interface Params {
  id: string;
  data: RecipeRequestBody;
}

export const putRecipe = async (params: Params) => {
  return await client.put<SpaceRecipe>(`/recipes/${params.id}`, params.data);
};

type UsePutRecipe = {
  config?: UseMutationOptions<AxiosResponse<SpaceRecipe, any>, unknown, Params, unknown>;
};

export const usePutRecipe = ({ config }: UsePutRecipe) => {
  return useMutation({
    ...config,
    mutationFn: putRecipe,
  });
};
