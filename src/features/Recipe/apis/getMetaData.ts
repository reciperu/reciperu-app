import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MetaData } from '../types';

import { client } from '@/lib/axios';

export const fetchMetaData = async (url: string): Promise<MetaData> => {
  return await client.get(`/recipes/meta-data?recipeUrl=${url}`);
};

type UseFetchMetaData = {
  config?: UseMutationOptions<MetaData, unknown, string, unknown>;
};

export const useFetchMetaData = ({ config }: UseFetchMetaData) => {
  return useMutation({
    ...config,
    mutationFn: fetchMetaData,
  });
};
