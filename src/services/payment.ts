import config from '@/configs/env';
import {
  CreatePortalSessionRequest,
  CreatePortalSessionResponse,
} from '@/models/PortalSession';
import {
  RetrieveCheckoutSessionRequest,
  RetrieveCheckoutSessionResponse,
} from '@/models/StripeCheckoutSessionType';
import {
  GetSubscriptionsResponse,
  SubscriptionMetadata,
} from '@/models/StripeSubscriptionType';
import { httpClient } from '@/utils/httpClient';

export const retrieveCheckoutSession = async (
  payload: RetrieveCheckoutSessionRequest
): Promise<RetrieveCheckoutSessionResponse> => {
  return httpClient.get(
    `${config.cloudFunctions.origin}/retrieveCheckoutSession`,
    payload
  );
};

export const createBillingCustomerPortal = async (
  payload: CreatePortalSessionRequest
): Promise<CreatePortalSessionResponse> => {
  return httpClient.post(
    `${config.cloudFunctions.origin}/billingCustomerPortal`,
    payload
  );
};

export const createCustomerSession = async (
  customerId: string
): Promise<{ message: string; data: string }> => {
  return httpClient.post(
    `${config.cloudFunctions.origin}/createStripeCustomerSession`,
    {
      customerId,
    }
  );
};

export const getSubscriptions = async (
  customerId: string
): Promise<GetSubscriptionsResponse> => {
  return httpClient.get(
    `${config.cloudFunctions.origin}/getAllSubscriptionsByCustomer/${customerId}`
  );
};

export const getFreeSubscriptionMetadata = async (
  customerId: string
): Promise<{ message: string; data: SubscriptionMetadata }> => {
  return httpClient.get(
    `${config.cloudFunctions.origin}/freeSubscriptionMetadata?customerId=${customerId}`
  );
};
