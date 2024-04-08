import { useSWRConfig } from 'swr';

import { client } from '@/lib/axios';

const _postRecipeRequest = async (id: string) =>
  await client.post<{ success: boolean }>(`/recipes/requests`, {
    recipeId: id,
  });

export const usePostRecipeRequest = () => {
  const { mutate } = useSWRConfig();
  const postRecipeRequest = (id: string) => {
    return mutate(`/recipes_${id}_requests`, () => _postRecipeRequest(id));
  };
  return { postRecipeRequest };
};
