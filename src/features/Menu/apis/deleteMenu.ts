import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface DeleteMenuRequestBody {
  id: string;
}

interface DeleteMenuResponse {}

export const deleteMenu = async (params: DeleteMenuRequestBody): Promise<DeleteMenuResponse> => {
  return await client.delete(`/menus/${params.id}`);
};

type UseDeleteMenu = {
  config?: UseMutationOptions<DeleteMenuResponse, unknown, DeleteMenuRequestBody, unknown>;
};

export const useDeleteMenu = ({ config }: UseDeleteMenu) => {
  return useMutation({
    ...config,
    mutationFn: deleteMenu,
  });
};
