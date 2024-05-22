import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { RecipeRequestBody, SpaceRecipe } from '../types';

import { client } from '@/lib/axios';

interface Params {
  id: string;
  data: RecipeRequestBody;
}

export const putRecipe = async (params: Params): Promise<SpaceRecipe> => {
  return await client.put(`/recipes/${params.id}`, params.data);
};

type UsePutRecipe = {
  config?: UseMutationOptions<SpaceRecipe, unknown, Params, unknown>;
};

export const usePutRecipe = ({ config }: UsePutRecipe) => {
  return useMutation({
    ...config,
    mutationFn: putRecipe,
  });
};
