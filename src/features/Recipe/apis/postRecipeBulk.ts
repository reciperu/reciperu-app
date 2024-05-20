import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { client } from '@/lib/axios';
import { Recipe } from '../types';

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
