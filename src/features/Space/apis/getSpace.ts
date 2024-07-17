import { useQuery } from '@tanstack/react-query';

import { Space } from '../types';

import { client } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getSpaces = async (id?: number): Promise<Space | null> => {
  if (!id) return null;
  return await client.get(`/spaces/${id}`);
};

type QueryFnType = typeof getSpaces;

type UseGetSpacesOptions = {
  id?: number;
  config?: QueryConfig<QueryFnType>;
};

export const useFetchSpace = ({ id, config }: UseGetSpacesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['spaces', id],
    queryFn: () => getSpaces(id),
    ...config,
  });
};
