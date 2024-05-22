import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { Space } from '../types';

import { client } from '@/lib/axios';

interface PutSpaceRequestBody {
  name: string;
}

interface Params {
  id: string;
  data: PutSpaceRequestBody;
}

export const putSpace = async (params: Params) => {
  return await client.put<Space>(`/spaces/${params.id}`, params.data);
};

type UsePutSpace = {
  config?: UseMutationOptions<AxiosResponse<Space, any>, unknown, Params, unknown>;
};

export const usePutSpace = ({ config }: UsePutSpace) => {
  return useMutation({
    ...config,
    mutationFn: putSpace,
  });
};
