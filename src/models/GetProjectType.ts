import { BasicAuthType } from './BasicAuth';
import { PageSnapShotType } from './pageSnapShot.model';
import { ScreenshotScheduleType } from './ScreenshotSchedule';

export type GetProjectResponseType = {
  message: string;
  data?: ProjectType;
};

export type GetProjectRequestType = {
  projectId: string;
};

export type ProjectType = {
  id: string;
  name: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  description: string;
  collaborators?: string[];
  slackWebhookURL?: string;
  approvedCommitId?: string;
  basicAuth: BasicAuthType | null;
  pageSnapShot?: PageSnapShotType[];
  sleepTimeBetweenScreenshot?: number;
  screenshotSchedule?: ScreenshotScheduleType | null;
};
