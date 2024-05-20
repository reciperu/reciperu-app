import { useFetchMyProfile } from '@/features/User/apis/getMyProfile';
import { useCallback } from 'react';

export type UseRecipes = () => {
  getFavorite: (requesters: string[]) => boolean;
  addRequester: (requesters: string[]) => string[];
  removeRequester: (requesters: string[]) => string[];
};

export const useRecipes: UseRecipes = () => {
  const { data: account } = useFetchMyProfile({});
  const getFavorite = useCallback(
    (requesters: string[]) => {
      return requesters.includes(account?.id || '');
    },
    [account?.id]
  );
  const addRequester = useCallback(
    (requesters: string[]) => {
      if (requesters && account?.id && !requesters.includes(account.id)) {
        return [...requesters, account.id];
      }
      return requesters;
    },
    [account?.id]
  );
  const removeRequester = useCallback((requesters: string[]) => {
    if (requesters && account?.id && requesters.includes(account.id)) {
      return requesters.filter((o) => o !== account.id);
    }
    return requesters;
  }, []);
  return { getFavorite, addRequester, removeRequester };
};
