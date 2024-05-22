import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { Recipe } from '../types';

import { client } from '@/lib/axios';

export const postRecipeBulk = async (data: Omit<Recipe, 'id'>[]): Promise<Recipe[]> => {
  return await client.post('/auth', data);
};

type UsePostRecipeBulk = {
  config?: UseMutationOptions<Recipe[], unknown, Omit<Recipe, 'id'>[], unknown>;
};

export const usePostRecipeBulk = ({ config }: UsePostRecipeBulk) => {
  return useMutation({
    ...config,
    mutationFn: postRecipeBulk,
  });
};
