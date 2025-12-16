'use client';
import { CommitButton } from '@/components/ui/CommitButton';
import { Time } from '@/components/ui/Time';
import { useQueryString } from '@/hooks/useQueryString';
import { ApproveCommitRequest } from '@/models/ApproveCommit';
import { CommitType } from '@/models/GetCommitsType';
import {
  COMMIT_BUTTON_TYPE,
  COMMIT_STATE,
  SCREENSHOT_STATUS_TYPE,
} from '@/types';
import { UseMutateFunction } from '@tanstack/react-query';
import Image from 'next/image';
import { FC, memo, useCallback, useMemo } from 'react';
import FailIcon from './assets/fail.svg';
import FlagIcon from './assets/flag.svg';
import SuccessIcon from './assets/success.svg';
import {
  Bold,
  ButtonCustom,
  Column,
  CommitId,
  CommitWrapper,
  CreatedAtComponent,
  FinishedAtWrapper,
  Title,
  Wrapper,
  WrapperCancel,
} from './styles';

type Props = {
  commit: CommitType;
  isApprovedCommit: boolean;
  onReject: UseMutateFunction<
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
  onCancel: UseMutateFunction<
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
  onApprove: (payload: Omit<ApproveCommitRequest, 'projectId'>) => void;
};

export const Commit: FC<Props> = memo(
  ({ commit, onReject, onApprove, onCancel, isApprovedCommit }) => {
    const { createQueryString, navigate } = useQueryString();

    const handleNavigate = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        navigate(createQueryString([{ name: 'commitId', value: commit.id }]));
      },
      [commit.id, createQueryString, navigate]
    );

    const isRejected = useMemo(
      () => commit.state === COMMIT_STATE.REJECTED,
      [commit.state]
    );

    const isCanceled = useMemo(
      () => commit.state === COMMIT_STATE.CANCELED,
      [commit.state]
    );

    const actionButtons = useMemo(() => {
      if (isCanceled) {
        return null;
      }

      if (isApprovedCommit) {
        return (
          <Wrapper>
            <Image src={FlagIcon} alt='flag icon' />
          </Wrapper>
        );
      }

      switch (commit.status) {
        case SCREENSHOT_STATUS_TYPE.pending:
          return (
            <WrapperCancel>
              <CommitButton
                onClick={(event) => {
                  event.stopPropagation();
                  onCancel({ commitId: commit.id });
                }}
                type={COMMIT_BUTTON_TYPE.CANCEL}
              />
              <ButtonCustom />
            </WrapperCancel>
          );

        case SCREENSHOT_STATUS_TYPE.done:
          return (
            <Wrapper>
              <CommitButton
                type={COMMIT_BUTTON_TYPE.REJECT}
                onClick={(event) => {
                  event.stopPropagation();
                  onReject({ commitId: commit.id });
                }}
              />
              <CommitButton
                type={COMMIT_BUTTON_TYPE.APPROVE}
                onClick={(event) => {
                  event.stopPropagation();
                  onApprove({ commitId: commit.id });
                }}
              />
            </Wrapper>
          );

        default:
          return null;
      }
    }, [
      commit.id,
      commit.status,
      isApprovedCommit,
      isCanceled,
      onApprove,
      onCancel,
      onReject,
    ]);

    const timeComponent = useMemo(() => {
      if (commit.status === SCREENSHOT_STATUS_TYPE.pending) {
        return 'In Progress';
      }

      if (!commit.finishedAt) {
        return null;
      }

      return <Time gap={15} time={commit.finishedAt} />;
    }, [commit.finishedAt, commit.status]);

    const createdAtComponent = useMemo(() => {
      if (!commit.createdAt) {
        return null;
      }

      return <Time gap={15} time={commit.createdAt} />;
    }, [commit.createdAt]);

    return (
      <CommitWrapper
        $isChangeDefaultStyles={isRejected || isCanceled}
        onClick={handleNavigate}
      >
        <Column>
          <div>Run #{commit.dateOrder}</div>
          <CommitId>{commit.id}</CommitId>
        </Column>
        <Column>
          <div>Pages</div>
          <Bold>{commit.pageSnapshots.length}</Bold>
        </Column>
        <Column>
          <Title>
            <Image
              src={SuccessIcon}
              width={32}
              height={32}
              alt='success icon'
            />
            Success
          </Title>
          <Bold>{commit.success}</Bold>
        </Column>
        <Column>
          <Title>
            <Image src={FailIcon} width={32} height={32} alt='fail icon' />
            Failed
          </Title>
          <Bold>{commit.fail}</Bold>
        </Column>
        <Column>
          <CreatedAtComponent>
            <Bold>Created at</Bold>
            <div>{createdAtComponent}</div>
          </CreatedAtComponent>
        </Column>
        <Column>
          <FinishedAtWrapper>
            <Bold>Finished at</Bold>
            <div>{timeComponent}</div>
          </FinishedAtWrapper>
        </Column>
        {isRejected || isCanceled ? null : <Column>{actionButtons}</Column>}
      </CommitWrapper>
    );
  }
);

Commit.displayName = 'Commit';
