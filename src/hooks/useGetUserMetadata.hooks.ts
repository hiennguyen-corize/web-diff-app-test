import { getUserMetadata } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useAuthenticated } from './auth.hook';

export const useGetUserMetadata = () => {
  const { setUser, user } = useAuthenticated();

  const get = useCallback(async () => {
    if (!user?.uid) {
      return;
    }

    try {
      const userMetadata = await getUserMetadata(user.uid);

      setUser((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          customerId: userMetadata?.customerId,
          screenshotCount: userMetadata?.screenshotCount,
        };
      });
      return userMetadata;
    } catch (error) {
      // do nothing
    }
  }, [setUser, user?.uid]);

  const {
    data: userMetadata,
    isLoading: isUserMetadataLoading,
    isFetched: isUserMetadataFetched,
  } = useQuery({
    queryKey: ['userMetadata'],
    enabled: !!user?.uid,
    queryFn: get,
  });

  return {
    isUserMetadataFetched,
    isUserMetadataLoading,
    userMetadata,
  };
};
