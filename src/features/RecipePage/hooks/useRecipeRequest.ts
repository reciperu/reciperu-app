import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';

import { useDeleteRecipeRequest } from '@/features/Recipe/apis/deleteRecipeRequest';
import { usePostRecipeRequest } from '@/features/Recipe/apis/postRecipeRequest';
import { useRecipes } from '@/features/Recipe/hooks/useRecipes';
import { SpaceRecipe } from '@/features/Recipe/types';

export type UseRecipeRequest = () => {
  toggle: (
    item: SpaceRecipe,
    onPrepareAddCallback: () => void,
    onPrepareRemoveCallback: () => void,
    onSuccessAddCallback: () => void,
    onSuccessRemoveCallback: () => void,
    onErrorAddCallback?: () => void,
    onErrorRemoveCallback?: () => void
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
      onPrepareAddCallback: () => void,
      onPrepareRemoveCallback: () => void,
      onSuccessAddCallback: () => void,
      onSuccessRemoveCallback: () => void,
      onErrorAddCallback?: () => void,
      onErrorRemoveCallback?: () => void
    ) => {
      if (pending) return;
      try {
        setPending(true);
        Haptics.selectionAsync();
        const isFavorite = getFavorite(item.requesters);
        if (isFavorite) {
          onPrepareRemoveCallback();
        } else {
          onPrepareAddCallback();
        }
        if (isFavorite) {
          await deleteMutation.mutateAsync(
            {
              data: {
                id: item.id,
              },
            },
            {
              onSuccess: () => {
                onSuccessRemoveCallback();
              },
              onError: () => {
                onErrorRemoveCallback?.();
              },
            }
          );
        } else {
          await postMutation.mutateAsync(
            {
              data: {
                recipeId: item.id,
              },
            },
            {
              onSuccess: () => {
                onSuccessAddCallback();
              },
              onError: () => {
                onErrorAddCallback?.();
              },
            }
          );
        }
        setPending(false);
      } catch (err) {
        console.error(err);
      } finally {
        setPending(false);
      }
    },
    [pending, getFavorite, deleteMutation, postMutation]
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
    [pending, getFavorite, deleteMutation]
  );
  return {
    toggle,
    remove,
    pending,
  };
};
