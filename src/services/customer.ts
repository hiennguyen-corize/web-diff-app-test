import config from '@/configs/env';
import { httpClient } from '@/utils/httpClient';

export const createStripeCustomer = async (
  email: string
): Promise<{ message: string; data: string }> => {
  return httpClient.post(
    `${config.cloudFunctions.origin}/createStripeCustomer`,
    { email }
  );
};
