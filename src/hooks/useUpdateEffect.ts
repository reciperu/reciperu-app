import { useEffect, useRef } from 'react';

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
  }, deps);
};
