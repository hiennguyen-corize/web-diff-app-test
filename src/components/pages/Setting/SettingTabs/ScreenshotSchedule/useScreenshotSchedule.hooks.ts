import { useNotification } from '@/hooks/useNotification';
import { useProjectPermission } from '@/hooks/useProjectPermission.hooks';
import useCurrentUser from '@/hooks/user.hook';
import { ProjectType } from '@/models/GetProjectType';
import {
  ScreenshotScheduleRequest,
  ScreenshotScheduleType,
} from '@/models/ScreenshotSchedule';
import { updateScreenshotSchedule } from '@/services/screenshotSchedule';
import { TIME_SUFFIXES_TYPE } from '@/types';
import { convertToISOString } from '@/utils/formatTime';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export type ScreenshotScheduleFieldValuesType = {
  suffix: TIME_SUFFIXES_TYPE;
  isActive: boolean;
  minutes: string;
  hours: string;
};

const defaultValues = {
  suffix: TIME_SUFFIXES_TYPE.AM,
  isActive: false,
  hours: '0',
  minutes: '00',
};

type HandleScreenshotSchedulePayloadType = ScreenshotScheduleFieldValuesType & {
  beforeSchedule?: ScreenshotScheduleType | null;
  projectId: string;
  userId: string;
};

export const useScreenshotSchedule = () => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  const { isAllowed, isPermissionChecking, checkUserPermission } =
    useProjectPermission();

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<ScreenshotScheduleFieldValuesType>({
    defaultValues,
  });

  const { setNotification } = useNotification();
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  const handleScreenshotSchedulePayload = useCallback(
    (
      payload: HandleScreenshotSchedulePayloadType
    ): ScreenshotScheduleRequest => {
      const {
        hours,
        suffix,
        userId,
        minutes,
        isActive,
        projectId,
        beforeSchedule = null,
      } = payload;

      const executeTime = convertToISOString(hours, minutes, suffix);

      return {
        userId,
        isActive,
        projectId,
        executeTime,
        beforeSchedule,
      };
    },
    []
  );

  const submit = useCallback(
    async (payload: ScreenshotScheduleFieldValuesType) => {
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

      const project = queryClient.getQueryData<ProjectType>([projectId]);
      const userId = user?.uid;

      if (!project || !userId) {
        return;
      }

      const beforeSchedule = project.screenshotSchedule;

      const requestPayload = handleScreenshotSchedulePayload({
        ...payload,
        beforeSchedule,
        projectId,
        userId,
      });

      const response = await updateScreenshotSchedule(requestPayload);
      return response.data;
    },
    [
      checkUserPermission,
      handleScreenshotSchedulePayload,
      projectId,
      queryClient,
      setNotification,
      user?.uid,
    ]
  );

  const handleSuccess = useCallback(
    (data?: ScreenshotScheduleType) => {
      if (!data || !projectId) {
        return;
      }

      queryClient.setQueryData<ProjectType>([projectId], (prev) => {
        if (!prev) {
          return prev;
        }

        const newProject = cloneDeep(prev);
        newProject.screenshotSchedule = data;
        return newProject;
      });

      setNotification({
        type: 'success',
        message: 'Screenshot schedule updated successfully',
      });
    },
    [projectId, queryClient, setNotification]
  );

  const handleError = useCallback(
    (error: unknown) => {
      setNotification({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Cannot update schedule',
      });
    },
    [setNotification]
  );

  const { mutate: onSubmit, isPending: isSubmitting } = useMutation({
    mutationFn: submit,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isDisabled = useMemo(
    () => isPermissionChecking !== false || !isAllowed || isSubmitting,
    [isAllowed, isPermissionChecking, isSubmitting]
  );

  return {
    control,
    resetForm,
    isDisabled,
    isSubmitting,
    notFound: isAllowed === false,
    onSubmit: handleSubmit((form) => onSubmit(form)),
  };
};
