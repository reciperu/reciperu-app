import { useQuery } from '@tanstack/react-query';

import { SpaceUser } from '../types';

import { client } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getUsers = async (): Promise<SpaceUser[]> => {
  return await client.get('/users');
};

type QueryFnType = typeof getUsers;

type UseGetUsersOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchUsers = ({ config }: UseGetUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['users'],
    queryFn: getUsers,
    ...config,
  });
};
