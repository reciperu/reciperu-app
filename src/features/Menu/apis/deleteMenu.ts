import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface DeleteMenuBody {
  id: number;
}

interface DeleteMenuResponse {
  success: boolean;
}

export const deleteMenu = async (params: DeleteMenuBody): Promise<DeleteMenuResponse> => {
  return await client.delete(`/menus/${params.id}`);
};

type UseDeleteMenu = {
  config?: UseMutationOptions<DeleteMenuResponse, unknown, DeleteMenuBody, unknown>;
};

export const useDeleteMenu = ({ config }: UseDeleteMenu) => {
  return useMutation({
    ...config,
    mutationFn: deleteMenu,
  });
};
