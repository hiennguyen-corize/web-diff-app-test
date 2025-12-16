import { useProjectDetail } from '@/components/admin/ProjectDetailPage/projectDetail.hooks';
import { Loading } from '@/components/ui/Loading';
import { RunVisualButtonRefType } from '@/components/ui/RunVisualButton';
import { MODAL_ID } from '@/constants/common';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll.hooks';
import {
  ApproveCommitRequest,
  ApproveCommitResponse,
} from '@/models/ApproveCommit';
import { CommitType } from '@/models/GetCommitsType';
import { UseMutateFunction } from '@tanstack/react-query';
import { FC, memo, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { Body } from './Body';
import { Header } from './Header/Header';
import { ViewTestResultWrapper } from './styles';
import { useCommit } from './useCommit.hooks';

export type ViewTestResultProps = {
  commits: CommitType[];
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

export const ViewTestResult: FC<ViewTestResultProps> = memo(
  ({
    commits,
    runVisualButtonRef,
    handleApprove,
    handleReject,
    handleCancel,
  }) => {
    const rootModal = document.getElementById(MODAL_ID);

    if (!rootModal) {
      return null;
    }

    const { project, isProjectDetailLoading, isProjectError } =
      useProjectDetail();

    const { commit } = useCommit(commits);

    useLockBodyScroll();

    const isError = isProjectError;
    const isLoading = isProjectDetailLoading;
    const isNotFound = !isLoading && (!project || !commit);

    return createPortal(
      <ViewTestResultWrapper>
        {isLoading && <Loading />}
        {isError && <div>Error</div>}
        {isNotFound && <div>Not found</div>}
        {project && commit && (
          <>
            <Header projectName={project.name} />
            <Body
              commit={commit}
              handleReject={handleReject}
              handleCancel={handleCancel}
              handleApprove={handleApprove}
              runVisualButtonRef={runVisualButtonRef}
              isApprovedCommit={project.approvedCommitId === commit.id}
            />
          </>
        )}
      </ViewTestResultWrapper>,
      rootModal
    );
  }
);

ViewTestResult.displayName = 'ViewTestResult';
