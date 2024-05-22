import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { client } from '@/lib/axios';

interface ContactRequest {
  email?: string;
  content: string;
}
interface ContactResponse {
  success: boolean;
}

export const postContact = async (data: ContactRequest): Promise<ContactResponse> => {
  return await client.post('/contact', data);
};

type UsePostContact = {
  config?: UseMutationOptions<ContactResponse, unknown, ContactRequest, unknown>;
};

export const usePostContact = ({ config }: UsePostContact) => {
  return useMutation({
    ...config,
    mutationFn: postContact,
  });
};
