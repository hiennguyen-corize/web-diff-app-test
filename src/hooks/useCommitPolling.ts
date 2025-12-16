import { COMMIT_POLLING_TIME } from '@/constants/polling';
import { CommitType } from '@/models/GetCommitsType';
import { getCommit } from '@/services/commit';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { cloneDeep, keyBy } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useInterval } from './useInterval';
import useCurrentUser from './user.hook';
import { useScreenshotSlots } from './useScreenshotSlots.hooks';
import { useUpdateDataQuery } from './useUpdateDataQuery';

export const useCommitPolling = (
  commits?: CommitType[],
  projectId?: string | null
) => {
  const { user } = useCurrentUser();
  const updateDataQuery = useUpdateDataQuery();
  const { refetchAddOnsScreenshotSlots } = useScreenshotSlots();

  const processingCommits = useMemo(
    () =>
      commits?.filter(
        (commit) => commit.status === SCREENSHOT_STATUS_TYPE.pending
      ) || [],
    [commits]
  );
  const processingCommitLength = useMemo(
    () => processingCommits?.length || 0,
    [processingCommits]
  );

  const handleGetCommit = useCallback(async () => {
    if (!user?.uid || !processingCommitLength || !projectId) {
      return;
    }

    const promises = processingCommits.map((processingCommit) =>
      getCommit({
        projectId,
        commitId: processingCommit.id,
      })
    );

    const newProcessingCommits = await Promise.all(promises);
    const newProcessingCommitsObject = keyBy(newProcessingCommits, 'id');

    updateDataQuery(
      [projectId, 'commits'],
      (prev: { commits: CommitType[]; hasMore: boolean }) => {
        const prevCommitsResponse = cloneDeep(prev);
        const newestCommits = prevCommitsResponse.commits.map(
          (commit) => newProcessingCommitsObject[commit.id] || commit
        );

        return { ...prevCommitsResponse, commits: newestCommits };
      }
    );

    await refetchAddOnsScreenshotSlots();
  }, [
    user?.uid,
    processingCommitLength,
    projectId,
    processingCommits,
    updateDataQuery,
    refetchAddOnsScreenshotSlots,
  ]);

  useInterval(handleGetCommit, COMMIT_POLLING_TIME, !!processingCommitLength);
};
