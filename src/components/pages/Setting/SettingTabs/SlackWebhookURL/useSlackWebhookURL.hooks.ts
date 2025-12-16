import { URL_REGEX } from '@/constants/regex';
import { useNotification } from '@/hooks/useNotification';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import { ProjectType } from '@/models/GetProjectType';
import { addSlackWebhookURLToProject } from '@/services/project';
import { sendSlackMessage } from '@/services/slackWebhook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const useSlackWebhookURL = () => {
  const { setNotification } = useNotification();
  const searchParams = useSearchParams();

  const projectId = searchParams.get('projectId');

  const queryClient = useQueryClient();

  const project = queryClient.getQueryData<ProjectType>([projectId]);

  const { isAllowed, isPermissionChecking, checkUserPermission } =
    useProjectPermission();

  const {
    control,
    setError,
    getValues,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: { slackWebhookURL: project?.slackWebhookURL || '' },
  });

  const slackWebhookURL = useMemo(
    () => project?.slackWebhookURL,
    [project?.slackWebhookURL]
  );

  const onSuccess = useCallback(
    (slackWebhookURL: string) => {
      queryClient.setQueryData<ProjectType>([projectId], (prev) => {
        const newProject = cloneDeep(prev);

        if (newProject?.slackWebhookURL) {
          newProject.slackWebhookURL = slackWebhookURL;
        }

        return newProject;
      });

      setNotification({
        type: 'success',
        message: 'Update slack webhook URL successfully!',
      });
    },
    [projectId, queryClient, setNotification]
  );

  const onSubmit = useCallback(
    async (data: { slackWebhookURL: string }) => {
      const isAllowed = await checkUserPermission();

      if (!isAllowed) {
        setNotification({
          type: 'error',
          message: 'You are not allowed to update slack webhook URL',
        });
        return;
      }

      try {
        if (!projectId) {
          return;
        }
        const response = await addSlackWebhookURLToProject(projectId, data);
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

  const { isPending: isAddURLPending, mutate: submit } = useMutation({
    mutationFn: onSubmit,
  });

  const handleCancel = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      resetForm({
        slackWebhookURL: slackWebhookURL,
      });
    },
    [slackWebhookURL, resetForm]
  );

  const handleNotificationTest = useCallback(async () => {
    try {
      const slackWebhookURL = getValues('slackWebhookURL');

      if (!slackWebhookURL) {
        setError('slackWebhookURL', {
          type: 'required',
          message: 'Slack Webhook URL is required',
        });
        return;
      }

      if (!URL_REGEX.test(slackWebhookURL)) {
        setError('slackWebhookURL', {
          type: 'pattern',
          message: 'Slack Webhook URL is invalid',
        });
        return;
      }

      await sendSlackMessage(slackWebhookURL);
      setError('slackWebhookURL', {});
      setNotification({
        type: 'success',
        message: 'Notification sent successfully',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message:
          error instanceof AxiosError ? error.message : 'Some thing error',
      });
    }
  }, [getValues, setError, setNotification]);

  const { mutate: notificationTest, isPending: isNotificationPending } =
    useMutation({
      mutationFn: handleNotificationTest,
    });

  const [disabled, isUpdating] = useMemo(() => {
    return [
      isAddURLPending || isNotificationPending || isPermissionChecking,
      isAddURLPending,
    ];
  }, [isAddURLPending, isNotificationPending, isPermissionChecking]);

  return {
    control,
    disabled,
    isUpdating,
    handleCancel,
    slackWebhookURL,
    notificationTest,
    notFound: isAllowed === false,
    handleSubmit: handleSubmit((form) => submit(form)),
  };
};
