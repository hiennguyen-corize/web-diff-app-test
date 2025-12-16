import env from '@/configs/env';
import db from '@/configs/firebase';
import {
  ScreenshotScheduleRequest,
  ScreenshotScheduleResponse,
  ScreenshotScheduleType,
} from '@/models/ScreenshotSchedule';
import { httpClient } from '@/utils/httpClient';
import { doc, updateDoc } from '@firebase/firestore';
import dayjs from 'dayjs';

export const updateScreenshotSchedule = async (
  request: ScreenshotScheduleRequest
): Promise<ScreenshotScheduleResponse> => {
  const { executeTime, isActive, projectId, beforeSchedule, userId } = request;

  await handleCloudSchedulerJob(isActive, executeTime, projectId, userId);

  const { scheduleJobId, updatedAt, createdAt } = await handleFireStoreJobDoc(
    projectId,
    userId,
    isActive,
    executeTime,
    beforeSchedule
  );

  return {
    message: 'Update screenshot schedule successfully',
    data: {
      scheduleJobId,
      executeTime,
      isActive,
      createdAt,
      updatedAt,
    },
  };
};

const handleFireStoreJobDoc = async (
  projectId: string,
  userId: string,
  isActive: boolean,
  executeTime: string,
  beforeSchedule: ScreenshotScheduleType | null
) => {
  const projectRef = doc(db, `/projects/${projectId}`);

  const isCreated = !!beforeSchedule?.scheduleJobId;

  const payload: Record<string, string | boolean> = {
    'screenshotSchedule.executeTime': executeTime,
    'screenshotSchedule.isActive': isActive,
  };

  const currentTime = dayjs().toISOString();
  const scheduleJobId = `${userId}-${projectId}`;

  if (!isCreated) {
    payload['screenshotSchedule.scheduleJobId'] = scheduleJobId;
    payload['screenshotSchedule.createdAt'] = currentTime;
  } else {
    payload['screenshotSchedule.updatedAt'] = currentTime;
  }

  await updateDoc(projectRef, payload);

  return {
    scheduleJobId,
    createdAt: isCreated ? beforeSchedule.createdAt : currentTime,
    updatedAt: !isCreated ? beforeSchedule?.updatedAt || null : currentTime,
  };
};

const handleCloudSchedulerJob = async (
  active: boolean,
  executeTime: string,
  projectId: string,
  userId: string
) => {
  await httpClient.post(`${env.cloudFunctions.origin}/handleScheduleJob`, {
    executeTime,
    projectId,
    userId,
    active,
  });
};

export const deleteScreenshotSchedule = async (
  projectId: string,
  userId: string
) => {
  await httpClient.delete(`${env.cloudFunctions.origin}/handleScheduleJob`, {
    projectId,
    userId,
  });
};
