import { AxiosError } from 'axios';
import useSWR from 'swr';

import { SpaceUser } from '@/features/users/types';

export const useFetchMyProfile = () => {
  return useSWR<SpaceUser, AxiosError>('/users/profile');
};
