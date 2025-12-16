import { useCommits } from '@/hooks/commits.hooks';
import { useFirstScreen } from '@/hooks/useFirstScreen';

import { ProjectType } from '@/models/GetProjectType';
import { getDetailProject } from '@/services/project';
import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { uniqBy } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

export const useProjectDetail = () => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  const { getCommitList } = useCommits();

  const { projectDetailScreenState, setProjectDetailScreenState } =
    useFirstScreen();

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
            storageTime: Infinity,
          }),
        enabled: !!projectId,
        refetchOnMount: false,
      },
      {
        queryKey: [projectId],
        queryFn: getProject,
        enabled: !!projectId,
      },
    ],
  });

  const commits = useMemo(
    () => uniqBy(commitsData?.commits ?? [], 'id'),
    [commitsData?.commits]
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
      !isCommitsSuccess
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
    isProjectFetching,
    isProjectSuccess,
    project?.pageSnapShot?.length,
    setProjectDetailScreenState,
  ]);

  return {
    isProjectDetailLoading,
    isProjectError,
    isCommitsError,
    project,
    commits,
  };
};
