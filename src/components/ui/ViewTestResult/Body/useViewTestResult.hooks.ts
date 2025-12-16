import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { cloneDeep } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export const useViewTestResult = (pageSnapshots: CommitPageSnapshotType[]) => {
  const [pageSnapshotsState, setPageSnapshotsState] = useState<
    CommitPageSnapshotType[]
  >([]);

  const handleFilter = useCallback(
    (filterState: SCREENSHOT_STATUS_TYPE) => {
      setPageSnapshotsState(() => {
        const newPageSnapshots = cloneDeep(pageSnapshots);
        return newPageSnapshots.filter(
          (pageSnap) =>
            pageSnap.status.desktop === filterState ||
            pageSnap.status.tablet === filterState ||
            pageSnap.status.mobile === filterState
        );
      });
    },
    [pageSnapshots]
  );

  useEffect(() => {
    setPageSnapshotsState(pageSnapshots);
  }, [pageSnapshots]);

  return {
    pageSnapshots: pageSnapshotsState,
    handleFilter,
  };
};
