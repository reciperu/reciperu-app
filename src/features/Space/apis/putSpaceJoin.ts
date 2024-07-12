import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface PutSpaceJoinRequestBody {
  token: string;
}

interface PutSpaceJoinResponse {
  success: true;
}

export const putSpaceJoin = async (
  body: PutSpaceJoinRequestBody
): Promise<PutSpaceJoinResponse> => {
  return await client.put(`/spaces/join`, body);
};

type UsePutSpaceJoin = {
  config?: UseMutationOptions<PutSpaceJoinResponse, unknown, PutSpaceJoinRequestBody, unknown>;
};

export const usePutSpaceJoin = ({ config }: UsePutSpaceJoin) => {
  return useMutation({
    ...config,
    mutationFn: putSpaceJoin,
  });
};
