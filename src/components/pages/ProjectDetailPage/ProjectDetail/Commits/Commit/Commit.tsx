'use client';
import { CommitButton } from '@/components/ui/CommitButton';
import { Time } from '@/components/ui/Time';
import { Tooltip } from '@/components/ui/Tooltip';
import { useApproveCommit } from '@/hooks/useApproveCommit.hooks';
import { useQueryString } from '@/hooks/useQueryString';
import { CommitType } from '@/models/GetCommitsType';
import {
  COMMIT_BUTTON_TYPE,
  COMMIT_STATE,
  SCREENSHOT_STATUS_TYPE,
} from '@/types';
import Image from 'next/image';
import { FC, useCallback, useMemo } from 'react';
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
} from './styles';

type Props = {
  commit: CommitType;
  isApprovedCommit: boolean;
};

export const Commit: FC<Props> = ({ commit, isApprovedCommit }) => {
  const { createQueryString, navigate } = useQueryString();

  const { handleApprove, handleReject, handleCancel } = useApproveCommit();

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
          <Wrapper>
            <CommitButton
              onClick={(event) => {
                event.stopPropagation();
                handleCancel({ commitId: commit.id });
              }}
              type={COMMIT_BUTTON_TYPE.CANCEL}
            />
            <ButtonCustom />
          </Wrapper>
        );

      case SCREENSHOT_STATUS_TYPE.done:
        return (
          <Wrapper>
            <CommitButton
              type={COMMIT_BUTTON_TYPE.REJECT}
              onClick={(event) => {
                event.stopPropagation();
                handleReject({ commitId: commit.id });
              }}
            />
            <CommitButton
              type={COMMIT_BUTTON_TYPE.APPROVE}
              onClick={(event) => {
                event.stopPropagation();
                handleApprove({ commitId: commit.id });
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
    handleApprove,
    handleCancel,
    handleReject,
    isApprovedCommit,
    isCanceled,
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
    <CommitWrapper onClick={handleNavigate}>
      <Column>
        <div>Run #{commit.dateOrder}</div>
        <CommitId>
          <Tooltip content={commit.id}>{commit.id}</Tooltip>
        </CommitId>
      </Column>
      <Column>
        <div>Pages</div>
        <Bold>{commit.pageSnapshots.length}</Bold>
      </Column>
      <Column>
        <Title>
          <Image src={SuccessIcon} width={32} height={32} alt='success icon' />
          Success
        </Title>
        <Bold>{commit.success}</Bold>
      </Column>
      <Column>
        <Title>
          <Image src={FailIcon} width={32} height={32} alt='fail icon' /> Failed
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
      <Column>{isRejected || isCanceled ? null : actionButtons}</Column>
    </CommitWrapper>
  );
};

Commit.displayName = 'Commit';
