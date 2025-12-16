import { showAllPagesAtom as adminShowAllPagesAtom } from '@/components/admin/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { showAllPagesAtom } from '@/components/pages/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { addPageSnapShot } from '@/services/pageSnapShot';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { compact } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useAddPageSnapshot = (onClose: () => void) => {
  const searchParams = useSearchParams();
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const setIsAllPagesShow = useSetAtom(showAllPagesAtom);
  const setAdminIsAllPagesShow = useSetAtom(adminShowAllPagesAtom);
  const queryClient = useQueryClient();

  const projectId = searchParams.get('projectId');

  const handleUpdateProjectData = useCallback(
    (responsePageSnapShots: PageSnapShotType[]) => {
      if (!projectId) {
        return;
      }

      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProjectDetail = { ...prev };
        const [newResponsePageSnapShots] = [...responsePageSnapShots];

        const pageSnapshots = [
          ...[newResponsePageSnapShots],
          ...(newProjectDetail.pageSnapShot ?? []),
        ];

        newProjectDetail.pageSnapShot = compact(pageSnapshots);

        return newProjectDetail;
      });
    },
    [projectId, updateDataQuery]
  );

  const handleSuccess = useCallback(
    (responsePageSnapShots: PageSnapShotType[]) => {
      onClose();
      handleUpdateProjectData(responsePageSnapShots);
      setNotification({
        type: 'success',
        message: 'Add new page successfully',
      });
    },
    [handleUpdateProjectData, onClose, setNotification]
  );

  const handleAddPageSnapshot = useCallback(
    async ({ newUrl }: { newUrl: string }) => {
      if (!projectId) {
        return;
      }

      try {
        const project = queryClient.getQueryData<ProjectType>([projectId]);
        const projectSnapshot = project?.pageSnapShot;

        if (projectSnapshot?.some((snapShot) => snapShot.url === newUrl)) {
          return setNotification({
            type: 'error',
            message: 'This page already exists',
          });
        }

        const response = await addPageSnapShot({
          projectId,
          baseInfo: [newUrl],
        });

        if (response.data) {
          handleSuccess(response.data);
          setIsAllPagesShow(true);
          setAdminIsAllPagesShow(true);
        }

        return response.data;
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof AxiosError
              ? error.response?.data.message
              : 'Add page failed',
        });
      }
    },
    [
      handleSuccess,
      projectId,
      queryClient,
      setAdminIsAllPagesShow,
      setIsAllPagesShow,
      setNotification,
    ]
  );

  const { mutate: addNewPageSnap, isPending: isAddingNewPage } = useMutation({
    mutationFn: handleAddPageSnapshot,
  });

  return {
    addNewPageSnap,
    isAddingNewPage,
  };
};
