import { useQueryString } from '@/hooks/useQueryString';
import { DEVICE_TYPE, RESULT_VIEW_MODE } from '@/types';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { currentDeviceAtom } from './Body';
import { currentModeAtom } from './ViewResultModal/Modal/TopModalWrapper/SelectMode';

export const compareModalAtom = atom(false);

export const useViewResultModal = () => {
  const [isCompareModalOpen, setIsCompareModalOpen] = useAtom(compareModalAtom);

  const hideModal = useCallback(() => {
    setIsCompareModalOpen(false);
  }, [setIsCompareModalOpen]);

  const { navigate, removeQueryString } = useQueryString();

  const setCurrentDevice = useSetAtom(currentDeviceAtom);
  const setCurrentMode = useSetAtom(currentModeAtom);

  const handleClose = useCallback(() => {
    setCurrentDevice(DEVICE_TYPE.DESKTOP);
    setCurrentMode(RESULT_VIEW_MODE.DIFF_PIXEL);
    navigate(removeQueryString([{ name: 'pageSnapshotId' }]));
    hideModal();
  }, [
    hideModal,
    navigate,
    removeQueryString,
    setCurrentDevice,
    setCurrentMode,
  ]);

  return {
    isModalOpen: isCompareModalOpen,
    handleClose,
  };
};
