import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface DeleteUserRequestBody {
  id: number;
}

interface DeleteUserResponse {}

export const deleteUser = async (params: DeleteUserRequestBody): Promise<DeleteUserResponse> => {
  return await client.delete(`/users/${params.id}`);
};

type UseDeleteUser = {
  config?: UseMutationOptions<DeleteUserResponse, unknown, DeleteUserRequestBody, unknown>;
};

export const useDeleteUser = ({ config }: UseDeleteUser) => {
  return useMutation({
    ...config,
    mutationFn: deleteUser,
  });
};
