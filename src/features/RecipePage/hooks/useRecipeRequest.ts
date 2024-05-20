import { useDeleteRecipeRequest } from '@/features/Recipe/apis/deleteRecipeRequest';
import { usePostRecipeRequest } from '@/features/Recipe/apis/postRecipeRequest';
import { useRecipes } from '@/features/Recipe/hooks/useRecipes';
import { SpaceRecipe } from '@/features/Recipe/types';
import { useCallback, useState } from 'react';

export type UseRecipeRequest = () => {
  toggle: (
    item: SpaceRecipe,
    onSuccessAddCallback: () => void,
    onSuccessRemoveCallback: () => void
  ) => void;
  remove: (item: SpaceRecipe, onSuccessCallback?: () => void) => void;
  pending: boolean;
};

export const useRecipeRequest: UseRecipeRequest = () => {
  const [pending, setPending] = useState(false);
  const deleteMutation = useDeleteRecipeRequest({});
  const postMutation = usePostRecipeRequest({});
  const { getFavorite } = useRecipes();
  // 「食べたい」のステートを入れ替える
  const toggle = useCallback(
    async (
      item: SpaceRecipe,
      onSuccessAddCallback: () => void,
      onSuccessRemoveCallback: () => void
    ) => {
      if (pending) return;
      try {
        setPending(true);
        const isFavorite = getFavorite(item.requesters);
        if (isFavorite) {
          const result = await deleteMutation.mutateAsync({
            data: {
              id: item.id,
            },
          });
          if (result?.success && onSuccessRemoveCallback) {
            onSuccessRemoveCallback();
          }
        } else {
          const result = await postMutation.mutateAsync({
            data: {
              recipeId: item.id,
            },
          });
          if (result?.success && onSuccessAddCallback) {
            onSuccessAddCallback();
          }
        }
        setPending(false);
      } catch (err) {
        console.error(err);
      } finally {
        setPending(false);
      }
    },
    [pending]
  );
  // 「食べたい」を解除する
  const remove = useCallback(
    async (item: SpaceRecipe, onSuccessCallback?: () => void) => {
      if (pending) return;
      setPending(true);
      const isFavorite = getFavorite(item.requesters);
      if (isFavorite) {
        const result = await deleteMutation.mutateAsync({
          data: {
            id: item.id,
          },
        });
        if (result?.success && onSuccessCallback) {
          onSuccessCallback();
        }
      }
      setPending(false);
    },
    [pending]
  );
  return {
    toggle,
    remove,
    pending,
  };
};
