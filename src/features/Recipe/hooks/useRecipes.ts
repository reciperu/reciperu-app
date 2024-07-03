import { useCallback } from 'react';

import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';

export type UseRecipes = () => {
  getFavorite: (requesters?: string[]) => boolean;
  addRequester: (requesters?: string[]) => string[] | undefined;
  removeRequester: (requesters?: string[]) => string[] | undefined;
};

export const useRecipes: UseRecipes = () => {
  const { data: account } = useFetchMyProfile({});
  const getFavorite = useCallback(
    (requesters?: string[]) => {
      if (requesters) {
        return requesters.includes(account?.id || '');
      }
      return false;
    },
    [account?.id]
  );
  const addRequester = useCallback(
    (requesters?: string[]) => {
      if (requesters !== undefined && account?.id && !requesters.includes(account.id)) {
        return [...requesters, account.id];
      }
      return requesters;
    },
    [account?.id]
  );
  const removeRequester = useCallback(
    (requesters?: string[]) => {
      if (requesters !== undefined && account?.id && requesters.includes(account.id)) {
        return requesters.filter((o) => o !== account.id);
      }
      return requesters;
    },
    [account?.id]
  );
  return { getFavorite, addRequester, removeRequester };
};
