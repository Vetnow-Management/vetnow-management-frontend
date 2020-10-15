import { useEffect, useRef } from 'react';

export default function useIsFirstRender(): boolean {
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}
