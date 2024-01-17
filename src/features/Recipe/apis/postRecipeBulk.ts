import { useSWRConfig } from 'swr';

import { Recipe } from '../types';

import { client } from '@/lib/axios';

const postRecipeBulk = async (body: Omit<Recipe, 'id'>[]) =>
  await client.post<Recipe[]>(`/recipes/bulk`, body);

export const usePostRecipeBulk = () => {
  const { mutate } = useSWRConfig();
  const postRecipeBulkData = (body: Omit<Recipe, 'id'>[]) => {
    return mutate('/recipes', () => postRecipeBulk(body), {
      populateCache: (updatedRecipes, currentRecipes) => {
        if (!currentRecipes?.length) {
          return { ...updatedRecipes.data };
        } else {
          return { ...currentRecipes, ...updatedRecipes.data };
        }
      },
      revalidate: false,
    });
  };
  return { postRecipeBulkData };
};
