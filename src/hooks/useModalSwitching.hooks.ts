import { MODAL_ANIMATION_DURATION } from '@/constants/modal';
import { atom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';

export const isModalSwitchingAtom = atom<boolean>(false);

export const useModalSwitching = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setIsModalSwitching = useSetAtom(isModalSwitchingAtom);

  const setSwitching = useCallback(() => {
    setIsModalSwitching(true);

    timeoutRef.current = setTimeout(() => {
      setIsModalSwitching(false);
      timeoutRef.current = null;
    }, MODAL_ANIMATION_DURATION + 100);
  }, [setIsModalSwitching]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsModalSwitching(false);
    };
  }, [setIsModalSwitching]);

  return { setSwitching };
};
