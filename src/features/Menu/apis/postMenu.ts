import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MenuItem } from '../types';

import { client } from '@/lib/axios';

export interface PostMenuRequestBody {
  recipeId: number;
  scheduledAt: string;
}

interface PostMenuResponse extends MenuItem {}

export const postMenu = async (data: PostMenuRequestBody): Promise<PostMenuResponse> => {
  return await client.post('/menus', data);
};

type UsePostMenu = {
  config?: UseMutationOptions<PostMenuResponse, unknown, PostMenuRequestBody, unknown>;
};

export const usePostMenu = ({ config }: UsePostMenu) => {
  return useMutation({
    ...config,
    mutationFn: postMenu,
  });
};
