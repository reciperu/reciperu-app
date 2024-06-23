import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MenuItem } from '../types';

import { client } from '@/lib/axios';

interface PutMenuRequestBody {
  status: string;
  scheduledAt: string;
}

interface Params {
  id: string;
  data: PutMenuRequestBody;
}

export const putMenu = async (params: Params): Promise<MenuItem> => {
  return await client.put(`/menus/${params.id}`, params.data);
};

type UsePutMenu = {
  config?: UseMutationOptions<MenuItem, unknown, Params, unknown>;
};

export const usePutMenu = ({ config }: UsePutMenu) => {
  return useMutation({
    ...config,
    mutationFn: putMenu,
  });
};
