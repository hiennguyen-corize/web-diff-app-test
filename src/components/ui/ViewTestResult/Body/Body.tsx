import { RunVisualButtonRefType } from '@/components/ui/RunVisualButton';
import {
  ApproveCommitRequest,
  ApproveCommitResponse,
} from '@/models/ApproveCommit';
import { CommitType } from '@/models/GetCommitsType';
import { COMMIT_STATE, DEVICE_TYPE } from '@/types';
import { UseMutateFunction } from '@tanstack/react-query';
import { atom } from 'jotai';
import { FC, RefObject, useMemo } from 'react';
import { BodyTop } from './BodyTop';
import { CommitTable } from './CommitTable';
import { ErrorModal } from './ErrorModal';
import { BodyWrapper, ResultScreenButtonsWrapper } from './styles';
import { useViewResultModal } from './useViewResultModal.hooks';
import { useViewTestResult } from './useViewTestResult.hooks';
import { ViewResultModal } from './ViewResultModal';

type Props = {
  commit: CommitType;
  isApprovedCommit: boolean;
  runVisualButtonRef: RefObject<RunVisualButtonRefType | null>;
  handleApprove: UseMutateFunction<
    ApproveCommitResponse | undefined,
    Error,
    Omit<ApproveCommitRequest, 'projectId'>,
    unknown
  >;
  handleReject: UseMutateFunction<
    | {
        message: string;
      }
    | undefined,
    Error,
    {
      commitId: string;
    },
    unknown
  >;
  handleCancel: UseMutateFunction<
    | {
        message: string;
      }
    | undefined,
    Error,
    {
      commitId: string;
    },
    unknown
  >;
};

export const currentDeviceAtom = atom<DEVICE_TYPE>(DEVICE_TYPE.DESKTOP);

export const Body: FC<Props> = ({
  commit,
  handleReject,
  handleCancel,
  handleApprove,
  isApprovedCommit,
  runVisualButtonRef,
}) => {
  const { isModalOpen, handleClose } = useViewResultModal();

  const { handleFilter, pageSnapshots } = useViewTestResult(
    commit.pageSnapshots
  );

  const isCancelled = useMemo(
    () => commit.state === COMMIT_STATE.CANCELED,
    [commit.state]
  );

  return (
    <div>
      <ViewResultModal
        open={isModalOpen}
        onClose={handleClose}
        commitPageSnapshots={commit.pageSnapshots}
      />
      <ErrorModal
        isCancelled={isCancelled}
        commitPageSnapshots={commit.pageSnapshots}
        runVisualButtonRef={runVisualButtonRef}
      />
      <BodyWrapper>
        <BodyTop
          commitId={commit.id}
          isCancelled={isCancelled}
          handleFilter={handleFilter}
          handleReject={handleReject}
          handleCancel={handleCancel}
          commitStatus={commit.status}
          handleApprove={handleApprove}
          commitDateOrder={commit.dateOrder}
          isApprovedCommit={isApprovedCommit}
          isRejectedCommit={commit.state === COMMIT_STATE.REJECTED}
        />
        <ResultScreenButtonsWrapper>
          <CommitTable commitId={commit.id} pageSnapshots={pageSnapshots} />
        </ResultScreenButtonsWrapper>
      </BodyWrapper>
    </div>
  );
};
