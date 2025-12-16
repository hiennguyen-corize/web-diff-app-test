import { ApiResponseCommon } from '@/types';

export type StripeSubscriptionType = {
  id: string;
  status: string;
  items: {
    price: {
      product: {
        name: string;
      };
    };
  }[];
  cancel_at_period_end: boolean;
  cancel_at: string;
  current_period_end: string;
  current_period_start: string;
  trial_period_days: number;
  trial_end: string;
  trial_start: string;
  metadata: SubscriptionMetadata;
};

export type GetSubscriptionsResponse = ApiResponseCommon & {
  data: { data: StripeSubscriptionType[] };
};

export type SubscriptionMetadata = {
  planName: string;
  totalScreenshotSlots: string;
  type: string;
  projectLimit: string;
  storageTime: string;
};
