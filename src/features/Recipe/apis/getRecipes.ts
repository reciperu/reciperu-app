import { useInfiniteQuery } from '@tanstack/react-query';

import { RecipesResponse } from '../types';

import { client } from '@/lib/axios';

interface Params {
  cursor?: number;
  isRequested?: boolean;
  title?: string;
}

export const getRecipes = async ({ pageParam, queryKey }: any): Promise<RecipesResponse> => {
  const [_, params] = queryKey;
  console.log(`pageParam: ${JSON.stringify(pageParam)}`);
  let url = '/recipes';
  if (pageParam !== undefined) {
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
  console.log(`url: ${url}`);
  return await client.get(url);
};

type UseGetRecipesOptions = {
  params: Params;
};

export const useFetchRecipes = ({ params }: UseGetRecipesOptions) => {
  return useInfiniteQuery({
    queryKey: ['recipes', { isRequested: params.isRequested, title: params.title }],
    queryFn: getRecipes,
    getNextPageParam: (lastPage, pages) => {
      console.log(`lastPage: ${JSON.stringify(lastPage.nextCursor)}`);
      return lastPage.nextCursor;
    },
    getPreviousPageParam: (firstPage, pages) => firstPage.nextCursor,
    initialPageParam: '',
  });
};
