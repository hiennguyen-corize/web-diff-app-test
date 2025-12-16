import useCurrentUser from '@/hooks/user.hook';
import { createCustomerSession } from '@/services/payment';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useCustomerSession = () => {
  const { user } = useCurrentUser();

  const createClientSecret = useCallback(async () => {
    if (!user?.customerId) {
      return;
    }

    try {
      const response = await createCustomerSession(user.customerId);
      return response.data;
    } catch (error) {
      // do nothing
    }
  }, [user?.customerId]);

  const {
    data: clientSecret,
    isError: isClientSecretError,
    isLoading: isClientSecretLoading,
  } = useQuery({
    queryKey: ['customerSession'],
    queryFn: createClientSecret,
    enabled: !!user?.customerId,
  });

  return {
    clientSecret,
    isClientSecretError,
    isClientSecretLoading,
  };
};
