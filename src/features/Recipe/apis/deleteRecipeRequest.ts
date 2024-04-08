import { useSWRConfig } from 'swr';

import { client } from '@/lib/axios';

const _deleteRecipeRequest = async (id: string) =>
  await client.delete<{ success: boolean }>(`/recipes/${id}/requests`);

export const useDeleteRecipeRequest = () => {
  const { mutate } = useSWRConfig();
  const deleteRecipeRequest = (id: string) => {
    return mutate(`/recipes_${id}_requests`, () => _deleteRecipeRequest(id));
  };
  return { deleteRecipeRequest };
};
