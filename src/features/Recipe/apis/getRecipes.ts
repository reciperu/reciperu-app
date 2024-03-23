import { AxiosError } from 'axios';
import useSWR from 'swr';

import { RecipesResponse } from '../types';

export const useFetchRecipes = (cursor?: string) => {
  return useSWR<RecipesResponse, AxiosError>(cursor ? `/recipes?cursor=${cursor}` : '/recipes');
};
