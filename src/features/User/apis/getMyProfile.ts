import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { SpaceUser } from '../types';

export const getMyProfile = async (): Promise<SpaceUser> => {
  return await client.get('/users/profile');
};

type QueryFnType = typeof getMyProfile;

type UseGetMyProfileOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchMyProfile = ({ config }: UseGetMyProfileOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['profile'],
    queryFn: getMyProfile,
    ...config,
  });
};
