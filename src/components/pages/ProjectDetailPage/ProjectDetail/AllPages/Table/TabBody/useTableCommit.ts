import { showAllPagesAtom } from '@/components/pages/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { useFirstScreen } from '@/hooks/useFirstScreen';
import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { useNotification } from '@/hooks/useNotification';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { deletePageSnapShot } from '@/services/pageSnapShot';
import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { cloneDeep } from 'lodash';
import { useTransitionRouter } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useTableCommit = () => {
  const setIsAllPagesShow = useSetAtom(showAllPagesAtom);

  const { push } = useTransitionRouter();
  const searchParams = useSearchParams();
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const projectId = searchParams.get('projectId');
  const { setProjectDetailScreenState } = useFirstScreen();
  const projectDetail = useGetFetchQuery<ProjectType>([projectId ?? '']);
  const { checkUserPermission } = useProjectPermission();

  const updateQuery = useCallback(
    (pageSnapShotId: string) => {
      if (!projectId) {
        return;
      }

      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProjectDetail = cloneDeep(prev);
        const pageSnapshots = newProjectDetail.pageSnapShot ?? [];

        const newPageSnapshots = pageSnapshots?.filter(
          (pageSnap) => pageSnap.id !== pageSnapShotId
        );

        newProjectDetail.pageSnapShot = newPageSnapshots;
        return newProjectDetail;
      });
    },
    [projectId, updateDataQuery]
  );

  const handleSuccess = useCallback(
    (pageSnapShotId: string) => {
      updateQuery(pageSnapShotId);
      setNotification({ type: 'success', message: 'Delete success' });
    },
    [setNotification, updateQuery]
  );

  const handleError = useCallback(() => {
    setNotification({ type: 'error', message: 'Delete error' });
  }, [setNotification]);

  const handleDeletePageSnap = useCallback(
    async (pageSnapShotId?: string) => {
      if (!projectId || !pageSnapShotId) {
        handleError();
        return;
      }

      try {
        const isAllowed = await checkUserPermission();

        if (!isAllowed) {
          setNotification({
            type: 'error',
            message: 'You are no longer a collaborator on this project',
          });
          push('/projects');
          return;
        }

        await deletePageSnapShot(projectId, pageSnapShotId);

        if (projectDetail?.pageSnapShot?.length === 1) {
          setIsAllPagesShow(false);
          setProjectDetailScreenState(
            PROJECT_DETAIL_STATE_TYPE.NOT_PAGES_AND_COMMITS
          );
        }
        handleSuccess(pageSnapShotId);
      } catch (error) {
        handleError();
      }
    },
    [
      checkUserPermission,
      handleError,
      handleSuccess,
      projectDetail?.pageSnapShot?.length,
      projectId,
      push,
      setIsAllPagesShow,
      setNotification,
      setProjectDetailScreenState,
    ]
  );

  const { mutate: deletePageSnap, isPending: isDeleting } = useMutation({
    mutationFn: handleDeletePageSnap,
  });

  return {
    pageSnapShots: projectDetail?.pageSnapShot,
    deletePageSnap,
    isDeleting,
  };
};
