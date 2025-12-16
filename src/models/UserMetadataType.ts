import { USER_PLANS_TYPE, USER_RULE_TYPE } from '@/types';

export type UserMetadataType = {
  rule: USER_RULE_TYPE;
  type?: USER_PLANS_TYPE;
  totalScreenshotSlots?: number;
  screenshotCount?: number;
  projectLimit?: number;
  storageTime?: number;
  customerId?: string;
  userId: string;
};
