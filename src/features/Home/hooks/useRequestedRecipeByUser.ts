import { useMemo } from 'react';

import { useFetchRequestedRecipes } from '@/features/Recipe/apis/getRequestedRecipes';
import { SpaceRecipe } from '@/features/Recipe/types';
import { useUser } from '@/features/User/hooks/useUser';

type UseRequestedRecipeByUser = () => {
  myRequestedRecipes: SpaceRecipe[];
  partnerRequestedRecipes: SpaceRecipe[];
};

export const useRequestedRecipeByUser: UseRequestedRecipeByUser = () => {
  const { data } = useFetchRequestedRecipes({});

  const { myInfo, partnerInfo } = useUser();

  const myRequestedRecipes = useMemo(() => {
    if (myInfo?.id) {
      return data?.data[myInfo.id] || [];
    }
    return [];
  }, [data, myInfo]);

  const partnerRequestedRecipes = useMemo(() => {
    if (partnerInfo) {
      return data?.data[partnerInfo.id || ''] || [];
    }
    return [];
  }, [data, partnerInfo]);

  return { myRequestedRecipes, partnerRequestedRecipes };
};
