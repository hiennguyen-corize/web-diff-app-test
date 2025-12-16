import { useNotification } from '@/hooks/useNotification';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import { BasicAuthRequest, BasicAuthType } from '@/models/BasicAuth';
import { ProjectType } from '@/models/GetProjectType';
import { createBasicAuth } from '@/services/basicAuth';
import { getDetailProject } from '@/services/project';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const useBasicAuth = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const { isAllowed, isPermissionChecking, checkUserPermission } =
    useProjectPermission();

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: { username: '', password: '' },
  });

  const getProject = useCallback(async (): Promise<ProjectType | undefined> => {
    if (!projectId) {
      return;
    }

    const cachedProjectData = queryClient.getQueryData<ProjectType>([
      projectId,
    ]);

    if (cachedProjectData && cachedProjectData.basicAuth) {
      resetForm({
        username: cachedProjectData.basicAuth.username,
        password: cachedProjectData.basicAuth.password,
      });
      return cachedProjectData;
    }

    try {
      const response = await getDetailProject(projectId);

      if (response.data && response.data.basicAuth) {
        resetForm({
          username: response.data.basicAuth.username,
          password: response.data.basicAuth.password,
        });
      }

      return response.data;
    } catch (error) {
      // do nothing
    }
  }, [projectId, queryClient, resetForm]);

  const { data: project, isLoading: isBasicAuthLoading } = useQuery({
    queryKey: [projectId],
    queryFn: getProject,
    enabled: !!projectId && !!isAllowed,
  });

  const onSuccess = useCallback(
    (basicAuth?: BasicAuthType | null) => {
      queryClient.setQueryData<ProjectType>([projectId], (prev) => {
        const newProject = cloneDeep(prev);

        if (newProject?.basicAuth && basicAuth) {
          newProject.basicAuth = basicAuth;
        }

        return newProject;
      });

      setNotification({
        type: 'success',
        message: 'Update basic auth successfully!',
      });
    },
    [projectId, queryClient, setNotification]
  );

  const onSubmit = useCallback(
    async (data: BasicAuthRequest) => {
      if (!projectId) {
        return;
      }

      const isAllowed = await checkUserPermission();

      if (!isAllowed) {
        setNotification({
          type: 'error',
          message: 'You do not have permission to add screenshot options',
        });
        return;
      }

      try {
        const response = await createBasicAuth(projectId, data);
        onSuccess(response.data);
        return response.data;
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
    [checkUserPermission, onSuccess, projectId, setNotification]
  );

  const { isPending: isCreateBasicAuthPending, mutate: submit } = useMutation({
    mutationFn: onSubmit,
  });

  const basicAuth = useMemo(() => project?.basicAuth, [project?.basicAuth]);

  const disabled = useMemo(
    () => isCreateBasicAuthPending,
    [isCreateBasicAuthPending]
  );

  const isUpdating = useMemo(
    () => isCreateBasicAuthPending,
    [isCreateBasicAuthPending]
  );

  const basicAuthLoading = useMemo(
    () => isPermissionChecking || isBasicAuthLoading,
    [isBasicAuthLoading, isPermissionChecking]
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      resetForm({
        username: basicAuth?.username,
        password: basicAuth?.password,
      });
    },
    [basicAuth?.password, basicAuth?.username, resetForm]
  );

  return {
    control,
    disabled,
    basicAuth,
    isUpdating,
    handleCancel,
    basicAuthLoading,
    notFound: isAllowed === false,
    handleSubmit: handleSubmit((form) => submit(form)),
  };
};
