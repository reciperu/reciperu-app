import { useMemo } from 'react';

import { useFetchMyProfile } from '../apis/getMyProfile';
import { SpaceUser } from '../types';

import { useFetchSpace } from '@/features/Space/apis/getSpace';

type UseUser = () => {
  myInfo: SpaceUser | null;
  partnerInfo: SpaceUser | null;
};

export const useUser: UseUser = () => {
  const { data: profile } = useFetchMyProfile({});
  const { data } = useFetchSpace({
    id: profile?.spaceId || '',
  });

  const myInfo = useMemo(() => {
    if (profile?.id) {
      return profile;
    }
    return null;
  }, [profile]);

  const partnerInfo = useMemo(() => {
    if (profile) {
      const partner = data?.users.find((user) => user.id !== profile?.id);
      if (partner) {
        return partner;
      }
    }
    return null;
  }, [data, profile]);

  return { myInfo, partnerInfo };
};
