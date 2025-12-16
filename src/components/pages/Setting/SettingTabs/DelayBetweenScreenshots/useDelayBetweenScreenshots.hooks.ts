import { useNotification } from '@/hooks/useNotification';
import { ProjectType } from '@/models/GetProjectType';
import { sleepTimeBetweenScreenshot } from '@/services/sleepTimeBetweenScreenshot';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cloneDeep } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useDelayBetweenScreenshots = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const projectId = params.get('projectId');
  const { setNotification } = useNotification();

  const [time, setTime] = useState(
    () =>
      queryClient.getQueryData<ProjectType>([projectId])
        ?.sleepTimeBetweenScreenshot || 1
  );

  const handleDelayBetweenScreenshots = useCallback(async () => {
    if (!projectId) {
      return;
    }

    if (time < 1) {
      setNotification({
        type: 'error',
        message: `Sleep time between screenshot must be greater than 1 minute.`,
      });
      return;
    }

    try {
      await sleepTimeBetweenScreenshot(time, projectId as string);
      setNotification({
        type: 'success',
        message: `Sleep time between screenshot updated to ${time} minutes.`,
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: `Failed to update sleep time between screenshot. Please try again.`,
      });
    }
  }, [projectId, setNotification, time]);

  const onSuccess = useCallback(() => {
    queryClient.setQueryData<ProjectType>([projectId], (prev) => {
      if (!prev) {
        return;
      }

      const newProject = cloneDeep(prev);
      newProject.sleepTimeBetweenScreenshot = time;
      return newProject;
    });
  }, [projectId, queryClient, time]);

  const handleCancel = useCallback(async () => {
    const project = queryClient.getQueryData<ProjectType>([projectId]);

    setTime(
      project?.sleepTimeBetweenScreenshot
        ? project.sleepTimeBetweenScreenshot
        : 1
    );
  }, [projectId, queryClient]);

  const {
    isPending: isDelayBetweenScreenshotsPending,
    mutate: mutateDelayBetweenScreenshots,
  } = useMutation({
    mutationFn: handleDelayBetweenScreenshots,
    onSuccess,
  });

  return {
    time,
    setTime,
    handleCancel,
    isDelayBetweenScreenshotsPending,
    mutateDelayBetweenScreenshots: () => mutateDelayBetweenScreenshots(),
  };
};
