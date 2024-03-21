import { AxiosError } from 'axios';
import useSWR from 'swr';

import { SpaceUser } from '@/features/User/types';

export const useFetchRecipes = (cursor?: string) => {
  return useSWR<SpaceUser[], AxiosError>(cursor ? `/recipes?cursor=${cursor}` : '/recipes');
};
