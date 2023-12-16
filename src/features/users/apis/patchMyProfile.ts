import { useSWRConfig } from 'swr';

import { SpaceUser, UpdatedUserBody } from '@/features/Users/types';
import { client } from '@/lib/axios';

const patchMyProfile = async (id: string, updatedProfile: UpdatedUserBody) =>
  await client.patch<SpaceUser>(`users/${id}`, updatedProfile);

export const usePatchMyProfile = () => {
  const { mutate } = useSWRConfig();
  const updateProfile = (id: string, updatedProfile: UpdatedUserBody) => {
    return mutate('/users/profile', () => patchMyProfile(id, updatedProfile), {
      populateCache: (updatedProfile, currentProfile) => {
        return { ...currentProfile, ...updatedProfile.data };
      },
      revalidate: false,
    });
  };
  return { updateProfile };
};
