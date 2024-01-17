import { useSWRConfig } from 'swr';

import { RecipeBook } from '@/features/Book/types';
import { client } from '@/lib/axios';

const putRecipeBookApi = async (id: string, name: string) =>
  await client.put<RecipeBook>(`/recipe-books/${id}`, {
    name,
  });

export const usePutRecipeBook = (id: string) => {
  const { mutate } = useSWRConfig();
  const putRecipeBook = (name: string) => {
    return mutate(`/recipe-books/${id}`, () => putRecipeBookApi(id, name), {
      populateCache: (updatedBook, currentBook) => {
        return { ...currentBook, ...updatedBook.data };
      },
      revalidate: false,
    });
  };
  return { putRecipeBook };
};
