import { useFocusEffect } from '@react-navigation/native';
import { NotifyOnChangeProps } from '@tanstack/query-core';
import React from 'react';

/**
 * 焦点が合っていない画面で再レンダリングを無効にする
 * https://tanstack.com/query/latest/docs/framework/react/react-native#disable-re-renders-on-out-of-focus-screens
 * 
 * @example
    function MyComponent() {
        const notifyOnChangeProps = useFocusNotifyOnChangeProps()

        const { dataUpdatedAt } = useQuery({
            queryKey: ['myKey'],
            queryFn: async () => {
            const response = await fetch(
                'https://api.github.com/repos/tannerlinsley/react-query',
            )
            return response.json()
            },
            notifyOnChangeProps,
        })

        return <Text>DataUpdatedAt: {dataUpdatedAt}</Text>
    }
 */

export function useFocusNotifyOnChangeProps(notifyOnChangeProps?: NotifyOnChangeProps) {
  const focusedRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, [])
  );

  return () => {
    if (!focusedRef.current) {
      return [];
    }

    if (typeof notifyOnChangeProps === 'function') {
      return notifyOnChangeProps();
    }

    return notifyOnChangeProps;
  };
}
