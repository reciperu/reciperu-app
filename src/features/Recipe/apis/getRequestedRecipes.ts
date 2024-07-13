import { useQuery } from '@tanstack/react-query';

import { SpaceRecipe } from '../types';

import { client } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

export const getRequestedRecipes = async (): Promise<Record<string, SpaceRecipe[]>> => {
  return await client.get('/recipes/requests');
};

type QueryFnType = typeof getRequestedRecipes;

type UseGetRoadmapOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useFetchRequestedRecipes = ({ config }: UseGetRoadmapOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['requested-recipes'],
    queryFn: getRequestedRecipes,
    ...config,
  });
};
