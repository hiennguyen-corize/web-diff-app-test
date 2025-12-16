import { STORAGE_TIME_DEFAULT } from '@/constants/visualTest';
import { getAddOnsStorageTime } from '@/services/addOns';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import useCurrentUser from './user.hook';

export const useVisualChecksStorageTime = () => {
  const { user } = useCurrentUser();

  const get = useCallback(async () => {
    try {
      if (!user?.customerId) {
        return;
      }

      const response = await getAddOnsStorageTime(user.customerId);
      return response.data + (user.storageTime || 0);
    } catch (error) {
      // do nothing
    }
  }, [user]);

  const {
    isLoading: isAddOnsStorageTimeLoading,
    isFetched: isAddOnsStorageTimeFetched,
    data: totalAddOnsStorageTime,
  } = useQuery({
    queryKey: ['addOnsStorageTime'],
    queryFn: get,
    enabled: !!user?.customerId,
  });

  return {
    isAddOnsStorageTimeLoading,
    isAddOnsStorageTimeFetched,
    totalAddOnsStorageTime:
      totalAddOnsStorageTime || user?.storageTime || STORAGE_TIME_DEFAULT,
  };
};
