import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { useSearchParams } from 'next/navigation';

export const useCommitPageSnapshot = (
  commitPageSnapshots: CommitPageSnapshotType[]
) => {
  const searchParams = useSearchParams();
  const pageSnapshotId = searchParams.get('pageSnapshotId');

  return {
    commitPageSnapshot: commitPageSnapshots.find(
      (pageSnapshot) => pageSnapshot.id === pageSnapshotId
    ),
  };
};
