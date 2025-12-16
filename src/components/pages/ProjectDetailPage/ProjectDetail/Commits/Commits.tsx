import {} from '@/hooks/commits.hooks';
import { useCommitPolling } from '@/hooks/useCommitPolling';
import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { CommitType } from '@/models/GetCommitsType';
import { ProjectType } from '@/models/GetProjectType';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { FC, memo } from 'react';
import { Commit } from './Commit';
import { CommitsWrapper, CommitWrapper, Time } from './styles';

type Props = {
  commits?: CommitType[];
};

export const Commits: FC<Props> = memo(({ commits }) => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  if (!projectId) {
    return null;
  }

  const project = useGetFetchQuery<ProjectType>([projectId]);
  const approvedCommitId = project?.approvedCommitId;
  let lastDate = '';

  const commitComponent = (commit: CommitType) => {
    const currentDate = dayjs(commit.createdAt).format('MMM DD YYYY');
    const shouldShowDate = currentDate !== lastDate;
    lastDate = currentDate;

    return (
      <CommitWrapper key={commit.id}>
        {shouldShowDate && <Time>{currentDate}</Time>}

        <Commit
          commit={commit}
          isApprovedCommit={commit.id === approvedCommitId}
        />
      </CommitWrapper>
    );
  };

  useCommitPolling(commits, projectId);

  return (
    <CommitsWrapper>
      {commits?.map((commit) => commitComponent(commit))}
    </CommitsWrapper>
  );
});

Commits.displayName = 'Commits';
