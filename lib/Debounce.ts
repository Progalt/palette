import { useEffect, useRef } from 'react';

export function useDebouncedEffect(callback: () => void, deps: any[], delay: number) {
  const handler = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);

    handler.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [...deps, delay]);
}
