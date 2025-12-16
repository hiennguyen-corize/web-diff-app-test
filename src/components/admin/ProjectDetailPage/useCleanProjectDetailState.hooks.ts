import { useFirstScreen } from '@/hooks/useFirstScreen';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { showAllPagesAtom } from './ProjectDetail/Top/ShowAllPageButton';

export const useCleanProjectDetailState = () => {
  const { setProjectDetailScreenState } = useFirstScreen();
  const setIsAllPagesTabShow = useSetAtom(showAllPagesAtom);

  useEffect(() => {
    return () => {
      setIsAllPagesTabShow(false);
      setProjectDetailScreenState(undefined);
    };
  }, [setIsAllPagesTabShow, setProjectDetailScreenState]);
};
