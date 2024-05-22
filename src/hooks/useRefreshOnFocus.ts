import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

/**
 * 画面フォーカス時に更新する
 * https://tanstack.com/query/latest/docs/framework/react/react-native#refresh-on-screen-focus
 */

export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}
