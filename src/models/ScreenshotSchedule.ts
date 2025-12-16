export type ScreenshotScheduleRequest = {
  beforeSchedule: ScreenshotScheduleType | null;
  executeTime: string;
  isActive: boolean;
  projectId: string;
  userId: string;
};

export type ScreenshotScheduleResponse = {
  message: string;
  data: ScreenshotScheduleType;
};

export type ScreenshotScheduleType = {
  updatedAt: string | null;
  scheduleJobId: string;
  executeTime: string;
  isActive: boolean;
  createdAt: string;
};
