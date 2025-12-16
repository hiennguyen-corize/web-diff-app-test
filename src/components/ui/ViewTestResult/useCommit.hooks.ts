import { CommitType } from '@/models/GetCommitsType';
import { find } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const useCommit = (commits: CommitType[]) => {
  const [commit, setCommit] = useState<CommitType>();

  const params = useSearchParams();

  const projectId = params.get('projectId');
  const commitId = params.get('commitId');

  const getCommit = useCallback(() => {
    if (!projectId || !commitId) {
      return;
    }

    const commit = find(commits, (commit) => commit.id === commitId);
    return commit;
  }, [commitId, commits, projectId]);

  useEffect(() => {
    setCommit(getCommit());
  }, [getCommit]);

  return {
    commit,
  };
};
