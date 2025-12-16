import { useClickOutside } from '@/utils/clickOutside';
import { RefObject, useCallback, useEffect } from 'react';

export const useModalEvent = (
  refs: RefObject<HTMLElement | null>[],
  onClose: () => void,
  open: boolean
) => {
  useClickOutside(refs, () => onClose(), [
    'first-overlay',
    'compare-image',
    'divider',
  ]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    },
    [onClose, open]
  );

  useEffect(() => {
    document.addEventListener('keydown', (event) => handleKeyDown(event));
    return document.removeEventListener('keydown', (event) =>
      handleKeyDown(event)
    );
  }, [handleKeyDown]);
};
