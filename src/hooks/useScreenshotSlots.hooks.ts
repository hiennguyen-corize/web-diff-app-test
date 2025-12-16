import { getAddOnsScreenshotSlots } from '@/services/addOns';
import { getUserMetadata } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import useCurrentUser from './user.hook';

export const useScreenshotSlots = () => {
  const { user } = useCurrentUser();

  const plusWithSubscriptionScreenshots = useCallback(
    (
      { screenshots, used }: { screenshots: number; used: number },
      screenshotCount: number
    ) => {
      return {
        screenshots: screenshots + (user?.totalScreenshotSlots || 0),
        used: used + (screenshotCount || 0),
      };
    },
    [user?.totalScreenshotSlots]
  );

  const get = useCallback(async () => {
    if (!user?.customerId || !user?.uid) {
      return;
    }

    try {
      const response = await getAddOnsScreenshotSlots(user.customerId);
      const userMetadataResponse = await getUserMetadata(user.uid);
      const screenshotCount = userMetadataResponse?.screenshotCount || 0;
      return plusWithSubscriptionScreenshots(response.data, screenshotCount);
    } catch (error) {
      // do nothing
    }
  }, [plusWithSubscriptionScreenshots, user?.customerId, user?.uid]);

  const {
    isLoading: isAddOnsScreenshotSlotsLoading,
    isFetched: isAddOnsScreenshotSlotsFetched,
    refetch: refetchAddOnsScreenshotSlots,
    data: totalAddOnsScreenshotSlots,
  } = useQuery({
    queryKey: ['addOnsScreenshotSlots'],
    staleTime: Infinity,
    queryFn: get,
    enabled: !!user?.customerId,
  });

  return {
    isAddOnsScreenshotSlotsLoading,
    isAddOnsScreenshotSlotsFetched,
    refetchAddOnsScreenshotSlots,
    totalAddOnsScreenshotSlots,
  };
};
