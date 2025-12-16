import {
  StripeSubscriptionType,
  SubscriptionMetadata,
} from '@/models/StripeSubscriptionType';
import {
  getFreeSubscriptionMetadata,
  getSubscriptions,
} from '@/services/payment';
import { isUserPlanIdType } from '@/utils/payment';
import { useQuery } from '@tanstack/react-query';
import { first } from 'lodash';
import { useCallback } from 'react';
import { useAuthenticated } from './auth.hook';
import useCurrentUser from './user.hook';

export const useStripeSubscriptions = () => {
  const { user } = useCurrentUser();
  const { setUser } = useAuthenticated();

  const extractPlanMetadata = useCallback(
    (metadata: SubscriptionMetadata) => {
      const state: Record<string, number> = {};

      const type = Number(metadata.type);
      const totalScreenshotSlots = Number(metadata.totalScreenshotSlots);
      const projectLimit = Number(metadata.projectLimit);
      const storageTime = Number(metadata.storageTime);

      if (typeof totalScreenshotSlots === 'number') {
        state.totalScreenshotSlots = totalScreenshotSlots;
      }

      if (typeof projectLimit === 'number') {
        state.projectLimit = projectLimit;
      }

      if (typeof storageTime === 'number') {
        state.storageTime = storageTime;
      }

      if (!isUserPlanIdType(type)) {
        return;
      }

      setUser((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          ...state,
          type,
        };
      });
    },
    [setUser]
  );

  const handleFreePlan = useCallback(
    async (customerId: string) => {
      const response = await getFreeSubscriptionMetadata(customerId);
      extractPlanMetadata(response.data);
    },
    [extractPlanMetadata]
  );

  const handleAfterGet = useCallback(
    async (subscriptions: StripeSubscriptionType[]) => {
      if (!user || !user.customerId) {
        return;
      }

      const firstSubscription = first(subscriptions);
      const metadata = firstSubscription?.metadata;

      if (!metadata) {
        await handleFreePlan(user.customerId);
        return;
      }

      extractPlanMetadata(metadata);
    },
    [extractPlanMetadata, handleFreePlan, user]
  );

  const get = useCallback(async () => {
    if (!user?.customerId) {
      return;
    }

    try {
      const response = await getSubscriptions(user.customerId);
      const subscriptions = response.data.data;
      handleAfterGet(subscriptions);
      return subscriptions;
    } catch (error) {
      return null;
    }
  }, [handleAfterGet, user]);

  const {
    data: subscriptions,
    isLoading: isSubscriptionsLoading,
    isFetched: isSubscriptionsFetched,
  } = useQuery({
    queryKey: ['subscriptions'],
    enabled: !!user?.customerId,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    queryFn: get,
  });

  return { subscriptions, isSubscriptionsLoading, isSubscriptionsFetched };
};
