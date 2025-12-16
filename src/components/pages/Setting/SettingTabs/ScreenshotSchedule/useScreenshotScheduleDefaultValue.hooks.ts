import { ProjectType } from '@/models/GetProjectType';
import { TIME_SUFFIXES_TYPE } from '@/types';
import { convertISOStringToLocalTime } from '@/utils/formatTime';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';
import { ScreenshotScheduleFieldValuesType } from './useScreenshotSchedule.hooks';

export type ScreenshotScheduleDefaultType = {
  suffix: TIME_SUFFIXES_TYPE;
  isActive: boolean;
  minutes: string;
  hours: string;
} | null;

export const useScreenshotScheduleDefaultValue = (
  resetForm: UseFormReset<ScreenshotScheduleFieldValuesType>
) => {
  const params = useSearchParams();
  const projectId = params.get('projectId');

  const queryClient = useQueryClient();
  const project = queryClient.getQueryData<ProjectType>([projectId]);
  const screenshotSchedule = project?.screenshotSchedule;

  const handleDefaultValue = useCallback(() => {
    if (!screenshotSchedule) {
      return;
    }

    const { hours, minutes, suffix } = convertISOStringToLocalTime(
      screenshotSchedule.executeTime
    );

    return {
      hours,
      suffix,
      minutes,
      isActive: screenshotSchedule.isActive,
    };
  }, [screenshotSchedule]);

  const handleCancel = useCallback(() => {
    resetForm(handleDefaultValue());
  }, [handleDefaultValue, resetForm]);

  useEffect(() => {
    if (screenshotSchedule) {
      handleCancel();
    }
  }, [handleCancel, screenshotSchedule]);

  return { handleCancel };
};
