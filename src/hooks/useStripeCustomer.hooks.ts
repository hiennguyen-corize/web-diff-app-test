import { createStripeCustomer } from '@/services/customer';
import { getUserMetadata } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import { atom, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { useAuthenticated } from './auth.hook';
import useCurrentUser from './user.hook';

export const isCreateStripeCustomerLoadingAtom = atom(false);

export const useStripeCustomer = () => {
  const setLoading = useSetAtom(isCreateStripeCustomerLoadingAtom);

  const { user } = useCurrentUser();
  const { setUser } = useAuthenticated();

  const create = useCallback(async () => {
    if (!user?.email || !!user?.customerId) {
      return;
    }

    try {
      setLoading(true);

      const response = await getUserMetadata(user.uid);
      if (response?.customerId) {
        return response.customerId;
      }

      const { data: customerId } = await createStripeCustomer(user.email);

      if (customerId) {
        setUser((prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,
            customerId: customerId,
          };
        });
      }

      return customerId;
    } catch (error) {
      // do nothing
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUser, user?.customerId, user?.email, user?.uid]);

  const { isLoading: isCreateStripeCustomerLoading, data: customerId } =
    useQuery({
      queryKey: ['createStripeCustomer'],
      queryFn: create,
      enabled: !!user && !user?.customerId,
      refetchOnWindowFocus: false,
      retry: false,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

  return {
    isCreateStripeCustomerLoading,
    customerId,
  };
};
