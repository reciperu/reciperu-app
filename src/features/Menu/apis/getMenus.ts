import { useInfiniteQuery } from '@tanstack/react-query';

import { MenuStatus, MenusResponse } from '../types';

import { client } from '@/lib/axios';

interface Params {
  cursor?: string;
  statuses?: MenuStatus[];
}

export const getMenus = async ({ pageParam, queryKey }: any): Promise<MenusResponse> => {
  const [_, params] = queryKey;
  let url = '/menus';
  if (pageParam !== undefined) {
    url += `?cursor=${pageParam}`;
  }
  if (params.statuses) {
    url += url.includes('cursor') ? '&' : '?';
    for (const status of params.statuses) {
      url += `statuses[]=${status}&`;
    }
    url = url.slice(0, -1);
  }
  return await client.get(url);
};

type UseGetMenusOptions = {
  params: Params;
};

export const useFetchMenus = ({ params }: UseGetMenusOptions) => {
  return useInfiniteQuery({
    queryKey: ['menus', { statuses: params.statuses }],
    queryFn: getMenus,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage, pages) => firstPage.nextCursor,
    initialPageParam: '',
  });
};
