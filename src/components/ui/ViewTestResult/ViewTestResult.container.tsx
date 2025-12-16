import { RunVisualButtonRefType } from '@/components/ui/RunVisualButton';
import { useApproveCommit } from '@/hooks/useApproveCommit.hooks';
import { CommitType } from '@/models/GetCommitsType';
import { useSearchParams } from 'next/navigation';
import { FC, memo, RefObject, useMemo } from 'react';
import { ViewTestResult } from './ViewTestResult';

type Props = {
  commits?: CommitType[];
  runVisualButtonRef: RefObject<RunVisualButtonRefType | null>;
};

export const ViewTestResultContainer: FC<Props> = memo(
  ({ commits, runVisualButtonRef }) => {
    const params = useSearchParams();
    const pageSnapshotId = params.get('commitId');
    const isShowViewTestResult = useMemo(
      () => !!pageSnapshotId && !!commits,
      [commits, pageSnapshotId]
    );

    const { handleApprove, handleReject, handleCancel } = useApproveCommit();

    return isShowViewTestResult && commits ? (
      <ViewTestResult
        runVisualButtonRef={runVisualButtonRef}
        handleApprove={handleApprove}
        handleCancel={handleCancel}
        handleReject={handleReject}
        commits={commits}
      />
    ) : null;
  }
);

ViewTestResultContainer.displayName = 'ViewTestResultContainer';
