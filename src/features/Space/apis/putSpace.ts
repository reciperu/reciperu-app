import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { Space } from '../types';

import { client } from '@/lib/axios';

interface PutSpaceRequestBody {
  name: string;
}

interface Params {
  id: number;
  data: PutSpaceRequestBody;
}

export const putSpace = async (params: Params): Promise<Space> => {
  return await client.put(`/spaces/${params.id}`, params.data);
};

type UsePutSpace = {
  config?: UseMutationOptions<Space, unknown, Params, unknown>;
};

export const usePutSpace = ({ config }: UsePutSpace) => {
  return useMutation({
    ...config,
    mutationFn: putSpace,
  });
};
