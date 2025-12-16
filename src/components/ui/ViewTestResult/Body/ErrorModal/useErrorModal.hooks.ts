import { useBooleanState } from '@/hooks/useBooleanState';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { compact } from 'lodash';
import { useEffect, useMemo } from 'react';

export const useErrorModal = (pageSnapshots: CommitPageSnapshotType[]) => {
  const {
    boolean: open,
    setTrue: openModal,
    setFalse: hideModal,
  } = useBooleanState(false);

  useEffect(() => {
    if (
      pageSnapshots.some(
        (pageSnap) =>
          pageSnap.status.desktop === SCREENSHOT_STATUS_TYPE.error ||
          pageSnap.status.tablet === SCREENSHOT_STATUS_TYPE.error ||
          pageSnap.status.mobile === SCREENSHOT_STATUS_TYPE.error
      )
    ) {
      openModal();
    }
  }, [pageSnapshots.length, openModal, pageSnapshots]);

  const errorMessages = useMemo(
    () => compact(pageSnapshots.map((pageSnap) => pageSnap.errorMessage)),
    [pageSnapshots]
  );

  return { open, openModal, hideModal, errorMessages };
};
