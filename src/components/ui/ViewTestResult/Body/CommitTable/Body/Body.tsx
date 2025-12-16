import { compareModalAtom } from '@/components/ui/ViewTestResult/Body';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { useSetAtom } from 'jotai';
import { FC, useCallback } from 'react';
import { Row } from './Row';

type Props = {
  commitId: string;
  pageSnapshots: CommitPageSnapshotType[];
};

/**
 * A table body component for displaying commit page snapshots.
 *
 * @param {CommitPageSnapshotType[]} pageSnapshots - The list of commit page snapshots to display.
 * @param {string} commitId - The ID of the commit.
 * @return {JSX.Element} A table body element containing the commit page snapshots.
 */
export const Body: FC<Props> = ({ pageSnapshots, commitId }) => {
  const setIsCompareModalOpen = useSetAtom(compareModalAtom);

  const openCompareModal = useCallback(() => {
    setIsCompareModalOpen(true);
  }, [setIsCompareModalOpen]);

  return (
    <tbody>
      {pageSnapshots.map((pageSnapshot) => (
        <Row
          key={pageSnapshot.id}
          commitId={commitId}
          click={openCompareModal}
          pageSnapshot={pageSnapshot}
        />
      ))}
    </tbody>
  );
};
