import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { SpaceUser } from '@/features/User/types';

export const postAuth = async (): Promise<SpaceUser> => {
  return await client.post('/auth');
};

type UsePostAuth = {
  config?: UseMutationOptions<SpaceUser, unknown, {}, unknown>;
};

export const usePostAuth = ({ config }: UsePostAuth) => {
  return useMutation({
    ...config,
    mutationFn: postAuth,
  });
};
