import { useGetUserMetadata } from '@/hooks/useGetUserMetadata.hooks';
import { useStripeCustomer } from '@/hooks/useStripeCustomer.hooks';
import { useStripeSubscriptions } from '@/hooks/useStripeSubscriptions';
import { atom, useSetAtom } from 'jotai';
import { memo, useEffect } from 'react';

export const isPlanLoadingAtom = atom(false);

export const LayoutProvider = memo(() => {
  const setIsPlanLoading = useSetAtom(isPlanLoadingAtom);

  const { isUserMetadataLoading, isUserMetadataFetched } = useGetUserMetadata();
  const { isCreateStripeCustomerLoading } = useStripeCustomer();
  const { isSubscriptionsLoading, isSubscriptionsFetched } =
    useStripeSubscriptions();

  useEffect(() => {
    const isFetched = isUserMetadataFetched && isSubscriptionsFetched;

    const isLoading =
      isUserMetadataLoading ||
      isCreateStripeCustomerLoading ||
      isSubscriptionsLoading;

    setIsPlanLoading(!isFetched && isLoading);
  }, [
    isCreateStripeCustomerLoading,
    isSubscriptionsFetched,
    isSubscriptionsLoading,
    isUserMetadataFetched,
    isUserMetadataLoading,
    setIsPlanLoading,
  ]);

  return null;
});

LayoutProvider.displayName = 'LayoutProvider';
