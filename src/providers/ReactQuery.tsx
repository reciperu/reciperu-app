import { QueryClientProvider, focusManager } from '@tanstack/react-query';
import { PropsWithChildren, memo, useEffect } from 'react';

import { queryClient } from '@/lib/react-query';
import { AppState, AppStateStatus, Platform } from 'react-native';

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

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
