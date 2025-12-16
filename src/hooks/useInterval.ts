import { useCallback, useEffect } from 'react';

export const useInterval = (
  callback: () => Promise<void>,
  interval: number,
  condition = false
) => {
  const tick = useCallback(async () => {
    await callback();
  }, [callback]);

  useEffect(() => {
    if (!interval || !condition) {
      return;
    }

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  });
};
