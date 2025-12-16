import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import {
  inviteOtherToCollaboration,
  kickUserFromCollaboration,
} from '@/services/project';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { UseFormReset } from 'react-hook-form';

export const useCollaborator = (
  reset?: UseFormReset<{
    email: string;
  }>
) => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  const { setNotification } = useNotification();
  const updateDataQuery = useUpdateDataQuery();

  const onInviteSuccess = useCallback(
    (response: { message: string; data: string }) => {
      reset?.();
      setNotification({ type: 'success', message: response.message });
      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProject = cloneDeep(prev);

        if (newProject.collaborators?.includes(response.data)) {
          return prev;
        }

        newProject.collaborators = [
          ...(newProject.collaborators ?? []),
          response.data,
        ];
        return newProject;
      });
    },
    [projectId, reset, setNotification, updateDataQuery]
  );

  const onRemoveCollaboratorSuccess = useCallback(
    (response: { message: string; data: string }) => {
      setNotification({ type: 'success', message: response.message });

      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProject = cloneDeep(prev);
        newProject.collaborators = newProject.collaborators?.filter(
          (collaborator) => collaborator !== response.data
        );
        return newProject;
      });
    },
    [projectId, setNotification, updateDataQuery]
  );

  const removeCollaborator = useCallback(
    async (email: string) => {
      if (!projectId) {
        return;
      }

      try {
        const response = await kickUserFromCollaboration(projectId, email);
        onRemoveCollaboratorSuccess(response);
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof FirebaseError
              ? error.message
              : 'Something went wrong',
        });
      }
    },
    [onRemoveCollaboratorSuccess, projectId, setNotification]
  );

  const addCollaborator = useCallback(
    async (email: string) => {
      if (!projectId) {
        return;
      }

      try {
        const response = await inviteOtherToCollaboration(projectId, email);
        onInviteSuccess(response);
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof FirebaseError
              ? error.message
              : 'Something went wrong',
        });
      }
    },
    [onInviteSuccess, projectId, setNotification]
  );

  const { mutate: handleAddCollaborator, isPending: isAddCollaboratorPending } =
    useMutation({
      mutationFn: addCollaborator,
    });

  const { mutate: handleRemoveCollaborator, isPending: isRemovePending } =
    useMutation({
      mutationFn: removeCollaborator,
    });

  return {
    handleRemoveCollaborator,
    isAddCollaboratorPending,
    handleAddCollaborator,
    isRemovePending,
  };
};
