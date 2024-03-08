import { useSWRConfig } from 'swr';

import { MetaData } from '../types';

import { client } from '@/lib/axios';

const getMetaData = async (url: string) =>
  await client.get<MetaData>(`/recipes/meta-data?recipeUrl=${url}`);

export const useFetchMetaData = () => {
  const { mutate } = useSWRConfig();
  const fetchMetaData = (url: string) => {
    return mutate('/recipes/meta-data', () => getMetaData(url), {
      revalidate: false,
    });
  };
  return { fetchMetaData };
};
