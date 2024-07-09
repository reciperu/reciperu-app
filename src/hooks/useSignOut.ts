import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import { useAuthContext } from '@/context/authProvider';
import secureStoreService, { StoreKeyEnum } from '@/lib/secureStore';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const authContext = useAuthContext();
  const router = useRouter();
  const handleSignOut = useCallback(async () => {
    await authContext.signOut();
    router.push('/(auth)/signIn');
    // クエリキャッシュをクリア
    queryClient.clear();
    // tokenを削除
    await Promise.all([
      secureStoreService.deleteValueFor(StoreKeyEnum.TOKEN),
      secureStoreService.deleteValueFor(StoreKeyEnum.REFRESH_TOKEN),
    ]);
  }, [authContext, router, queryClient]);

  return { handleSignOut };
};
