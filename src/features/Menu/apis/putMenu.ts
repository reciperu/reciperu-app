import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MenuItem } from '../types';

import { client } from '@/lib/axios';

export interface PutMenuRequestBody {
  id: number;
  data: {
    recipeId: number;
    scheduledAt: string;
  };
}

interface PutMenuResponse extends MenuItem {}

export const postMenu = async (params: PutMenuRequestBody): Promise<PutMenuResponse> => {
  return await client.put(`/menus/${params.id}`, params.data);
};

type UsePutMenu = {
  config?: UseMutationOptions<PutMenuResponse, unknown, PutMenuRequestBody, unknown>;
};

export const usePutMenu = ({ config }: UsePutMenu) => {
  return useMutation({
    ...config,
    mutationFn: postMenu,
  });
};
