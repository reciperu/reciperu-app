import { useSWRConfig } from 'swr';

import { SpaceUser } from '@/features/User/types';
import { client } from '@/lib/axios';

// TODO: api修正まち
const getMetaData = async (url: string) =>
  await client.get<SpaceUser>(`/recipes/meta-data?url=${url}`);

export const useFetchMetaData = () => {
  const { mutate } = useSWRConfig();
  const fetchMetaData = (url: string) => {
    return mutate('/recipes/meta-data', () => getMetaData(url), {
      revalidate: false,
    });
  };
  return { fetchMetaData };
};
