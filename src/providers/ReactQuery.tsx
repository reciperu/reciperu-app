import { QueryClientProvider, focusManager } from '@tanstack/react-query';
import { PropsWithChildren, memo, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

import { queryClient } from '@/lib/react-query';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const Context = memo<PropsWithChildren>(({ children }) => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);
  return <>{children}</>;
});

export const ReactQueryClientProvider = memo<PropsWithChildren>(({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Context>{children}</Context>
    </QueryClientProvider>
  );
});
