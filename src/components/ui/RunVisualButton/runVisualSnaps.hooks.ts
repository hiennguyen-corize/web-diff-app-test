import { useAdminContext } from '@/hooks/useAdminContext';
import { useNotification } from '@/hooks/useNotification';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import useCurrentUser from '@/hooks/user.hook';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { CreateCommitDocsResponse } from '@/models/CreateCommitDocsType';
import { CommitType } from '@/models/GetCommitsType';
import { ProjectType } from '@/models/GetProjectType';
import {
  createVisualSnapshotDocs,
  screenshotVisualTest,
} from '@/services/runVisualSnapshot';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { cloneDeep, first } from 'lodash';
import { useTransitionRouter } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useVisualSnaps = () => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  const { push } = useTransitionRouter();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { isAdmin } = useAdminContext();
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const { checkUserPermission } = useProjectPermission();

  const onSuccess = useCallback(
    (response?: CreateCommitDocsResponse) => {
      if (!response || !projectId || !user?.uid) {
        return;
      }

      try {
        updateDataQuery(
          [projectId, 'commits'],
          (prev: { commits: CommitType[]; hasMore: boolean }) => {
            const newCommitsResponse = cloneDeep(prev);
            newCommitsResponse.commits.unshift(response.data);
            return newCommitsResponse;
          }
        );

        screenshotVisualTest(response.data.id, projectId, user.uid);

        queryClient.invalidateQueries({ queryKey: ['userMetadata'] });
      } catch (error) {
        // do nothing
      }
    },
    [projectId, queryClient, updateDataQuery, user?.uid]
  );

  const handleDateOrder = useCallback(() => {
    const commitsResponse = queryClient.getQueryData<{
      commits: CommitType[];
      hasMore: boolean;
    }>([projectId, 'commits']);

    const firstCommit = first(commitsResponse?.commits);

    const today = dayjs().format('YYYY-MM-DD');

    if (!firstCommit) {
      return 1;
    }

    const firstCommitCreatedAt = dayjs(firstCommit.createdAt).format(
      'YYYY-MM-DD'
    );

    if (firstCommitCreatedAt !== today) {
      return 1;
    }

    return firstCommit.dateOrder + 1;
  }, [projectId, queryClient]);

  const canCreate = useCallback(async () => {
    if (!isAdmin) {
      const isAllowed = await checkUserPermission();

      if (!isAllowed) {
        setNotification({
          type: 'error',
          message: 'You are no longer a collaborator on this project',
        });
        push('/projects');
        return { can: false };
      }
    }

    const project = queryClient.getQueryData<ProjectType>([projectId]);
    const pageSnapshotLength = project?.pageSnapShot?.length;

    if (!projectId || !user?.uid || !pageSnapshotLength) {
      return { can: false };
    }

    const reachedLimit =
      !!user.screenshotCount &&
      !!user.totalScreenshotSlots &&
      user.screenshotCount + pageSnapshotLength > user.totalScreenshotSlots;

    if (reachedLimit) {
      setNotification({
        type: 'error',
        message: 'You have reached the limit of screenshot slots',
      });
      return { can: false };
    }

    return { can: true, projectId, pageSnapshotLength, uid: user.uid };
  }, [
    checkUserPermission,
    isAdmin,
    projectId,
    push,
    queryClient,
    setNotification,
    user?.screenshotCount,
    user?.totalScreenshotSlots,
    user?.uid,
  ]);

  const createDocs = useCallback(async () => {
    try {
      const create = await canCreate();
      if (
        !create.can ||
        !create.pageSnapshotLength ||
        !create.projectId ||
        !create.uid
      ) {
        return;
      }

      const dateOrder = handleDateOrder();

      const response = await createVisualSnapshotDocs({
        pageSnapshotLength: create.pageSnapshotLength,
        projectId: create.projectId,
        userId: create.uid,
        dateOrder,
      });

      return response;
    } catch (error) {
      setNotification({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  }, [canCreate, handleDateOrder, setNotification]);

  const { mutate: createCommitDocs, isPending: isRunning } = useMutation({
    mutationFn: createDocs,
    onSuccess,
  });

  return {
    isRunning,
    createCommitDocs,
  };
};
