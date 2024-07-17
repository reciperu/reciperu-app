import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface RecipeRequestRequestBody {
  id: number;
}

interface DeleteRecipeRequestResponse {
  success: boolean;
}

interface Params {
  data: RecipeRequestRequestBody;
}

export const deleteRecipeRequest = async (params: Params): Promise<DeleteRecipeRequestResponse> => {
  return await client.delete(`/recipes/${params.data.id}/requests`);
};

type UseDeleteRecipeRequest = {
  config?: UseMutationOptions<DeleteRecipeRequestResponse, unknown, Params, unknown>;
};

export const useDeleteRecipeRequest = ({ config }: UseDeleteRecipeRequest) => {
  return useMutation({
    ...config,
    mutationFn: deleteRecipeRequest,
  });
};
