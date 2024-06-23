import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { MetaData } from '../types';

import { client } from '@/lib/axios';

export const fetchMetaData = async (url: string): Promise<MetaData | null> => {
  if (url.length === 0) return null;
  return await client.get(`/recipes/meta-data?recipeUrl=${url}`);
};

type UseFetchMetaData = {
  config?: UseMutationOptions<MetaData | null, unknown, string, unknown>;
};

export const useFetchMetaData = ({ config }: UseFetchMetaData) => {
  return useMutation({
    ...config,
    mutationFn: fetchMetaData,
  });
};
