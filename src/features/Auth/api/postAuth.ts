import { useSWRConfig } from 'swr';

import { SpaceUser } from '@/features/Users/types';
import { client } from '@/lib/axios';

const postAuthApi = async () => await client.post<SpaceUser>('/auth');

export const usePostAuth = () => {
  const { mutate } = useSWRConfig();
  const postAuth = () => {
    return mutate('/users/profile', () => postAuthApi(), {
      populateCache: (updatedProfile, currentProfile) => {
        return { ...currentProfile, ...updatedProfile.data };
      },
      revalidate: false,
    });
  };
  return { postAuth };
};
