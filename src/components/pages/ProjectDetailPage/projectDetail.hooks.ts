import { useCommits } from '@/hooks/commits.hooks';
import { useFirstScreen } from '@/hooks/useFirstScreen';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import useCurrentUser from '@/hooks/user.hook';
import { useVisualChecksStorageTime } from '@/hooks/useVisualChecksStorageTime.hooks';

import { ProjectType } from '@/models/GetProjectType';
import { getDetailProject } from '@/services/project';
import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

export const useProjectDetail = () => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { getCommitList } = useCommits();
  const { isAllowed, isPermissionChecking } = useProjectPermission();

  const { projectDetailScreenState, setProjectDetailScreenState } =
    useFirstScreen();

  const {
    isAddOnsStorageTimeLoading,
    isAddOnsStorageTimeFetched,
    totalAddOnsStorageTime,
  } = useVisualChecksStorageTime();

  const isNotAllowed = useMemo(() => isAllowed === false, [isAllowed]);

  const getProject = useCallback(async (): Promise<ProjectType | undefined> => {
    if (!projectId) {
      return;
    }

    try {
      const response = await getDetailProject(projectId);
      return response.data;
    } catch (error) {
      return;
    }
  }, [projectId]);

  const [
    {
      isSuccess: isCommitsSuccess,
      isFetching: isCommitsFetching,
      isPending: isCommitsPending,
      isError: isCommitsError,
      data: commitsData,
    },
    {
      isSuccess: isProjectSuccess,
      isFetching: isProjectFetching,
      isPending: isProjectPending,
      isError: isProjectError,
      data: project,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: [projectId, 'commits'],
        queryFn: async () =>
          await getCommitList({
            projectId: projectId || '',
            storageTime: totalAddOnsStorageTime,
          }),
        enabled:
          !!isAllowed &&
          !!projectId &&
          !!user &&
          isAddOnsStorageTimeFetched &&
          !isAddOnsStorageTimeLoading,
      },
      {
        queryKey: [projectId],
        queryFn: getProject,
        enabled: !!isAllowed && !!projectId,
      },
    ],
  });

  const commits = useMemo(() => commitsData?.commits || [], [commitsData]);

  const isBuyMoreStorageShow = useMemo(
    () => !!commitsData?.hasMore || false,
    [commitsData?.hasMore]
  );

  const isProjectLoading = useMemo(
    () => (isProjectPending || isProjectFetching) && !project,
    [isProjectFetching, isProjectPending, project]
  );

  const isCommitsLoading = useMemo(
    () => (isCommitsPending || isCommitsFetching) && !commits?.length,
    [commits?.length, isCommitsFetching, isCommitsPending]
  );

  const isProjectDetailScreenStateNotInitial = useMemo(
    () => projectDetailScreenState === undefined,
    [projectDetailScreenState]
  );

  const isProjectDetailLoading = useMemo(
    () =>
      (isProjectLoading && isProjectDetailScreenStateNotInitial) ||
      (isCommitsLoading && isProjectDetailScreenStateNotInitial),
    [isCommitsLoading, isProjectDetailScreenStateNotInitial, isProjectLoading]
  );

  useEffect(() => {
    if (
      isCommitsFetching ||
      isProjectFetching ||
      !isProjectSuccess ||
      !isCommitsSuccess ||
      isPermissionChecking
    ) {
      return;
    }

    if (!commits?.length && !project?.pageSnapShot?.length) {
      setProjectDetailScreenState(
        PROJECT_DETAIL_STATE_TYPE.NOT_PAGES_AND_COMMITS
      );
      return;
    }

    if (!commits?.length && project?.pageSnapShot?.length) {
      setProjectDetailScreenState(
        PROJECT_DETAIL_STATE_TYPE.HAVE_PAGES_BUT_NOT_COMMITS
      );
      return;
    }

    setProjectDetailScreenState(PROJECT_DETAIL_STATE_TYPE.DEFAULT);
  }, [
    commits?.length,
    isCommitsFetching,
    isCommitsSuccess,
    isPermissionChecking,
    isProjectFetching,
    isProjectSuccess,
    project?.pageSnapShot?.length,
    setProjectDetailScreenState,
  ]);

  useEffect(() => {
    if (isNotAllowed) {
      queryClient.setQueryData([projectId], null);
      queryClient.setQueryData([projectId, 'commits'], {
        commits: [],
        hasMore: false,
      });
    }
  }, [isAllowed, isNotAllowed, projectId, queryClient]);

  return {
    commits: uniqBy(commits, 'id'),
    isProjectDetailLoading,
    notFound: isNotAllowed,
    isBuyMoreStorageShow,
    isProjectError,
    isCommitsError,
    project,
  };
};
