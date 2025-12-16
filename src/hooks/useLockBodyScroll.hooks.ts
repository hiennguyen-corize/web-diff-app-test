import { useCallback, useEffect } from 'react';

export const useLockBodyScroll = () => {
  const lockBodyScroll = useCallback(() => {
    document.body.style.overflowY = 'hidden';
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflowY = 'auto';
  }, []);

  useEffect(() => {
    lockBodyScroll();
    return unlockBodyScroll;
  }, [lockBodyScroll, unlockBodyScroll]);
};
