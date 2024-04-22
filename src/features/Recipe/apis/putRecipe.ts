import { useSWRConfig } from 'swr';

import { client } from '@/lib/axios';
import { Recipe, RecipeRequest } from '../types';

const _putRecipe = async (id: string, body: RecipeRequest) =>
  await client.put<Recipe>(`/recipes/${id}`, body);

export const usePutRecipe = () => {
  const { mutate } = useSWRConfig();
  const putRecipe = (id: string, body: RecipeRequest) => {
    return mutate(`/recipes_${id}_requests`, () => _putRecipe(id, body));
  };
  return { putRecipe };
};
