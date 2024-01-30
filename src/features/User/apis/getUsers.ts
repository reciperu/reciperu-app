import { AxiosError } from 'axios';
import useSWR from 'swr';

import { SpaceUser } from '@/features/User/types';

export const useFetchUsers = () => {
  return useSWR<SpaceUser[], AxiosError>('/users');
};
