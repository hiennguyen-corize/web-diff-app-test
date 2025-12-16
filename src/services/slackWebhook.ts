import config from '@/configs/env';
import { httpClient } from '@/utils/httpClient';

export const sendSlackMessage = (webhookUrl: string) =>
  httpClient.post(`${config.cloudFunctions.origin}/slackTestNotification`, {
    webhookUrl,
  });
