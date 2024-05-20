import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { RoadmapItem } from '../types';

export const getRoadmap = async (): Promise<RoadmapItem[]> => {
  return await client.get('/roadmap');
};

type QueryFnType = typeof getRoadmap;

type UseGetRoadmapOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchRoadmap = ({ config }: UseGetRoadmapOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['roadmap'],
    queryFn: getRoadmap,
    ...config,
  });
};
