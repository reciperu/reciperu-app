import { AxiosError } from 'axios';
import useSWR from 'swr';

import { Space } from '@/features/Space/types';

export const useFetchSpace = (id: string) => {
  return useSWR<Space, AxiosError>(`/spaces/${id}`);
};
