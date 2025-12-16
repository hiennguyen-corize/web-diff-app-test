import { showAllPagesAtom } from '@/components/admin/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { useFirstScreen } from '@/hooks/useFirstScreen';
import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { deletePageSnapShot } from '@/services/pageSnapShot';
import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useTableCommit = () => {
  const setIsAllPagesShow = useSetAtom(showAllPagesAtom);

  const searchParams = useSearchParams();
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const projectId = searchParams.get('projectId');
  const { setProjectDetailScreenState } = useFirstScreen();
  const projectDetail = useGetFetchQuery<ProjectType>([projectId ?? '']);

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
      handleError,
      handleSuccess,
      projectDetail?.pageSnapShot?.length,
      projectId,
      setIsAllPagesShow,
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
