import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { UpdatedUserTokenRequestBody, UpdatedUserTokenResponse } from '../types';

import { client } from '@/lib/axios';

export const putToken = async (
  body: UpdatedUserTokenRequestBody
): Promise<UpdatedUserTokenResponse> => {
  return await client.put(`users/token`, body);
};

type UsePutToken = {
  config?: UseMutationOptions<
    UpdatedUserTokenResponse,
    unknown,
    UpdatedUserTokenRequestBody,
    unknown
  >;
};

export const usePutToken = ({ config }: UsePutToken) => {
  return useMutation({
    ...config,
    mutationFn: putToken,
  });
};
