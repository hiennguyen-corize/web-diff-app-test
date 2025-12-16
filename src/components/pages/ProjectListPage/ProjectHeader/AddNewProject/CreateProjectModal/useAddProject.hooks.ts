import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { AddNewProjectRequest } from '@/models/AddNewProjectType';
import { ProjectsOmitType } from '@/models/GetProjectsType';
import { addProject } from '@/services/project';
import { Cookie, getCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useCallback } from 'react';

export const useAddProject = (setCloseModal: () => void) => {
  const { setNotification } = useNotification();

  const updateDataQuery = useUpdateDataQuery();

  const handleUpdateProjects = useCallback(
    (aNew: ProjectsOmitType) => {
      updateDataQuery(
        ['projects'],

        (prev: ProjectsOmitType[]) => {
          const newProjects = cloneDeep(prev);
          newProjects?.unshift(aNew);
          return newProjects;
        }
      );
    },
    [updateDataQuery]
  );

  const addNewProject = useCallback(
    async ({ name, description }: AddNewProjectRequest) => {
      try {
        const uuid = getCookie(Cookie.UUID);
        const response = await addProject(
          { name: name.trim(), description: description.trim() },
          uuid
        );

        if (!response.data) {
          throw new AxiosError('Project not found');
        }

        handleUpdateProjects(response.data);
        setCloseModal();
        setNotification({
          type: 'success',
          message: 'Create Project successfully',
        });
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof AxiosError
              ? error.message
              : 'Something went wrong',
        });
      }
    },
    [handleUpdateProjects, setCloseModal, setNotification]
  );

  const { mutate: addAProject, isPending: isAddingProject } = useMutation({
    mutationFn: addNewProject,
  });

  return {
    addAProject,
    isAddingProject,
  };
};
