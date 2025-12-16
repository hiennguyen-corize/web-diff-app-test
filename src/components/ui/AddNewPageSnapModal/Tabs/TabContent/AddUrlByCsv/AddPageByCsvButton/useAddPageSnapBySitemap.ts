import { showAllPagesAtom } from '@/components/admin/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { addPageSnapshotsBySitemap } from '@/services/pageSnapShot';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useAddPageSnapBySitemap = (onClose: () => void) => {
  const params = useSearchParams();
  const projectId = params.get('projectId');
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const setIsAllPagesShow = useSetAtom(showAllPagesAtom);

  const handleAddPageSnapshotBySitemap = useCallback(
    async ({ sitemapUrl }: { sitemapUrl: string }) => {
      if (!projectId) {
        return;
      }

      try {
        const response = await addPageSnapshotsBySitemap({
          projectId,
          sitemapUrl,
        });

        const newPageSnapshots = response.data;

        if (!newPageSnapshots) {
          return;
        }

        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProject = cloneDeep(prev);

          if (!newProject.pageSnapShot) {
            newProject.pageSnapShot = [];
          }

          newProject.pageSnapShot.push(...newPageSnapshots);
          return newProject;
        });

        setNotification({
          type: 'success',
          message: 'Add multiple pages successfully',
        });

        setIsAllPagesShow(true);
        onClose();
        return newPageSnapshots;
      } catch (error) {
        setNotification({
          type: 'error',
          message: ((error as AxiosError).response?.data as string) ?? '',
        });
      }
    },
    [onClose, projectId, setIsAllPagesShow, setNotification, updateDataQuery]
  );

  const {
    mutate: addPageSnapshotBySitemap,
    isPending: isAddingPagesBySitemap,
  } = useMutation({
    mutationFn: handleAddPageSnapshotBySitemap,
  });

  return {
    addPageSnapshotBySitemap,
    isAddingPagesBySitemap,
  };
};
