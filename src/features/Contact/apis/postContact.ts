import { useSWRConfig } from 'swr';

import { client } from '@/lib/axios';

const postContact = async (body: { email?: string; content: string }) =>
  await client.post<{ success: boolean }>(`/contact`, body);

export const usePostContact = () => {
  const { mutate } = useSWRConfig();
  const postContactData = (body: { email?: string; content: string }) => {
    return mutate('/contact', () => postContact(body), {
      revalidate: false,
    });
  };
  return { postContactData };
};
