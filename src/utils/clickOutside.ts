import { RefObject, useCallback, useEffect } from 'react';

/** Click outside hook */
export const useClickOutside = (
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  callback?: () => void,
  excludes?: string[]
) => {
  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (!(target instanceof Node)) {
        return;
      }
      const newRefs = Array.isArray(refs) ? refs : [refs];

      const defaultCondition = !newRefs.some((ref) =>
        ref.current?.contains(target)
      );

      const excludesCondition =
        target instanceof HTMLElement &&
        !excludes?.includes(target.id || target.className);

      if (defaultCondition && excludesCondition) {
        callback?.();
      }
    },
    [callback, excludes, refs]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
