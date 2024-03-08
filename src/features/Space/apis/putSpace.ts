import { useSWRConfig } from 'swr';

import { Space } from '@/features/Space/types';
import { client } from '@/lib/axios';

const putSpaceApi = async (id: string, name: string) =>
  await client.put<Space>(`/spaces/${id}`, {
    name,
  });

export const usePutSpace = (id: string) => {
  const { mutate } = useSWRConfig();
  const putSpace = (name: string) => {
    return mutate(`/spaces/${id}`, () => putSpaceApi(id, name), {
      populateCache: (updatedSpace, currentSpace) => {
        if (currentSpace) {
          return { ...currentSpace, ...updatedSpace };
        } else {
          return updatedSpace;
        }
      },
      revalidate: false,
    });
  };
  return { putSpace };
};
