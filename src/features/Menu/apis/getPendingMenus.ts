import { useQuery } from '@tanstack/react-query';

import { MenuItem } from '../types';

import { client } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getPendingMenus = async (): Promise<MenuItem[]> => {
  return await client.get(`/menus/pending`);
};

type QueryFnType = typeof getPendingMenus;

type UseGetPendingMenusOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchSpace = ({ config }: UseGetPendingMenusOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['pending-menus'],
    queryFn: () => getPendingMenus(),
    ...config,
  });
};
