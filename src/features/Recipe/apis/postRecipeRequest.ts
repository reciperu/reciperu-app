import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface RecipeRequestRequestBody {
  recipeId: number;
}

interface RecipeRequestResponse {
  success: boolean;
}

interface Params {
  data: RecipeRequestRequestBody;
}

export const postRecipeRequest = async (params: Params): Promise<RecipeRequestResponse> => {
  return await client.post('/recipes/requests', params.data);
};

type UsePostRecipeRequest = {
  config?: UseMutationOptions<RecipeRequestResponse, unknown, Params, unknown>;
};

export const usePostRecipeRequest = ({ config }: UsePostRecipeRequest) => {
  return useMutation({
    ...config,
    mutationFn: postRecipeRequest,
  });
};
