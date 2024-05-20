import { useInfiniteQuery } from '@tanstack/react-query';

import { client } from '@/lib/axios';
import { RecipesResponse } from '../types';
import { AxiosResponse } from 'axios';

interface Params {
  cursor?: string;
  isRequested?: boolean;
  title?: string;
}

export const getRecipes = async ({ pageParam, queryKey }: any): Promise<RecipesResponse> => {
  const [_, params] = queryKey;
  let url = '/recipes';
  if (pageParam.length) {
    url += `?cursor=${pageParam}`;
  }
  if (params.isRequested) {
    url += url.includes('cursor') ? '&' : '?';
    url += 'isRequested=true';
  }
  if (params.title) {
    url += url.includes('cursor') ? '&' : '?';
    url += `title=${params.title}`;
  }
  return await client.get(url);
};

type UseGetRecipesOptions = {
  params: Params;
};

export const useFetchRecipes = ({ params }: UseGetRecipesOptions) => {
  return useInfiniteQuery({
    queryKey: ['recipes', { isRequested: params.isRequested, title: params.title }],
    queryFn: getRecipes,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, pages) => firstPage.nextCursor,
    initialPageParam: '',
  });
};
