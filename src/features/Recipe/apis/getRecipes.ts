import { AxiosError } from 'axios';
import useSWR from 'swr';

import { RecipesResponse } from '../types';
import { useMemo } from 'react';

interface Params {
  cursor?: string;
  isRequested?: boolean;
  title?: string;
}

export const useFetchRecipes = (params: Params) => {
  // queryを含めたURLの作成
  const endpoint = useMemo(() => {
    let url = '/recipes';
    if (params.cursor) {
      url += `?cursor=${params.cursor}`;
    }
    if (params.isRequested) {
      url += url.includes('?') ? '&' : '?';
      url += 'isRequested=true';
    }
    if (params.title) {
      url += url.includes('?') ? '&' : '?';
      url += `title=${params.title}`;
    }
    return url;
  }, [params]);
  console.log(`endpoint: ${endpoint}`);
  return useSWR<RecipesResponse, AxiosError>(endpoint);
};
