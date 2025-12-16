import { CommitButton } from '@/components/ui/CommitButton';
import {
  ApproveCommitRequest,
  ApproveCommitResponse,
} from '@/models/ApproveCommit';
import { COMMIT_BUTTON_TYPE, SCREENSHOT_STATUS_TYPE } from '@/types';
import { UseMutateFunction } from '@tanstack/react-query';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import FlagIcon from './assets/flag.svg';
import { FilterDropdown } from './FilterDropdown';
import {
  BodyTopWrapper,
  CommitActions,
  CommitId,
  CommitName,
  CommitNameWrapper,
  Wrapper,
} from './styles';

type Props = {
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
  handleFilter: (filterState: SCREENSHOT_STATUS_TYPE) => void;
  isApprovedCommit: boolean;
  isRejectedCommit: boolean;
  commitDateOrder: number;
  commitStatus?: string;
  isCancelled: boolean;
  commitId: string;
};

export const BodyTop: FC<Props> = ({
  isApprovedCommit,
  isRejectedCommit,
  commitDateOrder,
  handleApprove,
  handleReject,
  handleFilter,
  commitStatus,
  handleCancel,
  isCancelled,
  commitId,
}) => {
  const actionButtons = useMemo(() => {
    if (isApprovedCommit || isRejectedCommit || isCancelled) {
      return null;
    }

    switch (commitStatus) {
      case SCREENSHOT_STATUS_TYPE.pending:
        return (
          <Wrapper>
            <CommitButton
              onClick={(event) => {
                event.stopPropagation();
                handleCancel({ commitId });
              }}
              type={COMMIT_BUTTON_TYPE.CANCEL}
            />
          </Wrapper>
        );

      case SCREENSHOT_STATUS_TYPE.done:
        return (
          <Wrapper>
            <CommitButton
              type={COMMIT_BUTTON_TYPE.REJECT}
              onClick={(event) => {
                event.stopPropagation();
                handleReject({ commitId });
              }}
            />
            <CommitButton
              type={COMMIT_BUTTON_TYPE.APPROVE}
              onClick={(event) => {
                event.stopPropagation();
                handleApprove({ commitId });
              }}
            />
          </Wrapper>
        );

      default:
        return null;
    }
  }, [
    commitId,
    commitStatus,
    handleApprove,
    handleCancel,
    handleReject,
    isApprovedCommit,
    isCancelled,
    isRejectedCommit,
  ]);

  return (
    <BodyTopWrapper>
      <CommitNameWrapper>
        {isApprovedCommit ? <Image src={FlagIcon} alt='flag icon' /> : null}
        <CommitName>Run: #{commitDateOrder}</CommitName>
        <CommitId>{commitId}</CommitId>
      </CommitNameWrapper>
      <CommitActions>
        <FilterDropdown onFilter={handleFilter} />
        {actionButtons}
      </CommitActions>
    </BodyTopWrapper>
  );
};
