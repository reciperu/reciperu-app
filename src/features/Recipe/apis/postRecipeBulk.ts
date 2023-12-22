import { useSWRConfig } from 'swr';

import { Recipe } from '../types';

import { client } from '@/lib/axios';

const postRecipeBulk = async (body: Omit<Recipe, 'id'>[]) =>
  await client.post<Recipe[]>(`/recipes/bulk`, body);

export const usePostRecipeBulk = () => {
  const { mutate } = useSWRConfig();
  const postRecipeBulkData = (body: Omit<Recipe, 'id'>[]) => {
    return mutate('/recipes/bulk', () => postRecipeBulk(body), {
      revalidate: false,
      // NOTE: レシピの一覧を更新
    });
  };
  return { postRecipeBulkData };
};
