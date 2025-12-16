import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectsOmitType } from '@/models/GetProjectsType';
import { editProject } from '@/services/project';
import { Cookie, getCookie } from '@/utils/cookie';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useCallback, useState } from 'react';

export const useEditProject = (
  projectName: string,
  projectDescription: string
) => {
  const [editProjectName, setEditProjectName] = useState(projectName);

  const [editProjectDescription, setEditProjectDescription] =
    useState(projectDescription);

  const { setNotification } = useNotification();

  const updateDataQuery = useUpdateDataQuery();

  const handleUpdateProjects = useCallback(
    (aNew: ProjectsOmitType, projectId: string) => {
      updateDataQuery(['projects'], (prev: ProjectsOmitType[]) => {
        const newProjects = cloneDeep(prev);

        return newProjects?.map((project) => {
          if (project.id === projectId) {
            return aNew;
          }
          return project;
        });
      });
    },
    [updateDataQuery]
  );

  const handleEditProject = useCallback(
    async ({
      projectId,
      callback,
    }: {
      projectId: string;
      callback: () => void;
    }) => {
      try {
        const uuid = getCookie(Cookie.UUID);

        if (!uuid) {
          return;
        }

        const response = await editProject(
          projectId,
          {
            name: editProjectName,
            description: editProjectDescription,
          },
          uuid
        );

        callback();
        handleUpdateProjects(response.data, projectId);
        setNotification({
          type: 'success',
          message: response.message,
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          setNotification({
            type: 'error',
            message: error.response?.data.message ?? '',
          });
        } else {
          setNotification({
            type: 'error',
            message: 'Something went wrong',
          });
        }
      }
    },
    [
      editProjectDescription,
      editProjectName,
      handleUpdateProjects,
      setNotification,
    ]
  );

  const { mutate: editCurrentProject, isPending: isEditSubmitting } =
    useMutation({
      mutationFn: handleEditProject,
    });

  return {
    editProjectName,
    isEditSubmitting,
    setEditProjectName,
    editCurrentProject,
    editProjectDescription,
    setEditProjectDescription,
  };
};
