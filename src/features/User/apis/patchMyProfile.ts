import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { SpaceUser, UpdatedUserBody } from '../types';

interface Params {
  id: string;
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
