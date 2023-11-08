import { AxiosError } from 'axios';
import useSWR from 'swr';

import { UserCheckResponse } from '@/features/users/types';

export const useFetchUserCheck = () => {
  return useSWR<UserCheckResponse, AxiosError>('/users/check');
};
