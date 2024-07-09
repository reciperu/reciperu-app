import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface PostSpaceInvitationResponseBody {
  token: string;
  expiredAt: string;
}

export const postSpaceInvitation = async (): Promise<PostSpaceInvitationResponseBody> => {
  return await client.post(`/spaces/invitations`);
};

type UsePostSpaceInvitation = {
  config?: UseMutationOptions<PostSpaceInvitationResponseBody, unknown, undefined, unknown>;
};

export const usePostSpaceInvitation = ({ config }: UsePostSpaceInvitation) => {
  return useMutation({
    ...config,
    mutationFn: postSpaceInvitation,
  });
};
