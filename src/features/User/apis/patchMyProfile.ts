import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { SpaceUser, UpdatedUserBody } from '../types';

import { client } from '@/lib/axios';

interface Params {
  id: number;
  data: UpdatedUserBody;
}

export const patchMyProfile = async (params: Params): Promise<SpaceUser> => {
  return await client.patch(`users/${params.id}`, params.data);
};

type UsePatchMyProfile = {
  config?: UseMutationOptions<SpaceUser, unknown, Params, unknown>;
};

export const usePatchMyProfile = ({ config }: UsePatchMyProfile) => {
  return useMutation({
    ...config,
    mutationFn: patchMyProfile,
  });
};
