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
  if (pageParam.length) {
    url += `?cursor=${pageParam}`;
  }
  // TODO: この形で渡すので良いか動作確認
  if (params.statuses) {
    url += url.includes('cursor') ? '&' : '?';
    url += `statuses=${params.statuses}`;
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
