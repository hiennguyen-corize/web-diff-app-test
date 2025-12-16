import { useNotification } from '@/hooks/useNotification';
import useCurrentUser from '@/hooks/user.hook';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectsOmitType } from '@/models/GetProjectsType';
import { deleteProject } from '@/services/project';
import { deleteScreenshotSchedule } from '@/services/screenshotSchedule';
import { useMutation } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import { useCallback, useState } from 'react';

export const useDeleteProjects = () => {
  const [deletingItemIdList, setDeletingItemIdList] = useState<string[]>([]);

  const { setNotification } = useNotification();
  const updateQueryData = useUpdateDataQuery();
  const { user } = useCurrentUser();

  const handleUpdateQueryData = useCallback(
    (deleteProjectId: string) => {
      updateQueryData(['projects'], (prev: ProjectsOmitType[]) => {
        const newProjects = cloneDeep(prev);

        return newProjects.filter((project) => project.id !== deleteProjectId);
      });
    },
    [updateQueryData]
  );

  const handleDeleteProject = useCallback(
    async ({ deleteProjectId }: { deleteProjectId: string }) => {
      if (!user?.uid) {
        return;
      }

      setDeletingItemIdList((prev) => [...prev, deleteProjectId]);

      try {
        await deleteScreenshotSchedule(deleteProjectId, user.uid);
      } catch (error) {
        // do nothing
      }

      try {
        await deleteProject(deleteProjectId, user.uid);
        handleUpdateQueryData(deleteProjectId);
        setNotification({
          type: 'success',
          message: 'Delete project successfully!',
        });
      } catch (error) {
        setNotification({
          type: 'fail',
          message: 'Delete project fail!',
        });
      } finally {
        setDeletingItemIdList((prev) =>
          prev.filter((id) => id !== deleteProjectId)
        );
      }
    },
    [handleUpdateQueryData, setNotification, user?.uid]
  );

  const { mutate: onDeleteProject, isPending: isProjectDeleting } = useMutation(
    {
      mutationFn: handleDeleteProject,
    }
  );

  return {
    onDeleteProject,
    isProjectDeleting,
    deletingItemIdList,
  };
};
