import { useNotification } from '@/hooks/useNotification';
import { useCallback } from 'react';

export const useCopyCurrentUrl = () => {
  const { setNotification } = useNotification();

  const copyCurrentUrl = useCallback(async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setNotification({ type: 'success', message: 'Copied' });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Copy to clipboard failed',
      });
    }
  }, [setNotification]);

  return { copyCurrentUrl };
};
