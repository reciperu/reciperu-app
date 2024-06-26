import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { SpaceUser } from '@/features/User/types';
import { client } from '@/lib/axios';

export const postAuth = async (): Promise<SpaceUser> => {
  return await client.post('/auth');
};

type UsePostAuth = {
  config?: UseMutationOptions<SpaceUser, unknown, object, unknown>;
};

export const usePostAuth = ({ config }: UsePostAuth) => {
  return useMutation({
    ...config,
    mutationFn: postAuth,
  });
};
