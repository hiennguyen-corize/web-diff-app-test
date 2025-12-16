import { layoutLoadingAtom } from '@/components/layout/LayoutLoading';
import useCurrentUser from '@/hooks/user.hook';
import { createBillingCustomerPortal } from '@/services/payment';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useTransitionRouter } from 'next-view-transitions';
import { useCallback } from 'react';

export const useNavigateUpgrade = () => {
  const setLayoutLoading = useSetAtom(layoutLoadingAtom);

  const { user } = useCurrentUser();
  const { push } = useTransitionRouter();

  const navigate = useCallback(async () => {
    if (!user || !user.customerId) {
      return;
    }

    try {
      setLayoutLoading(true);
      const response = await createBillingCustomerPortal({
        customerId: user.customerId,
      });

      push(response.data);
    } catch (error) {
      setLayoutLoading(false);
    }
  }, [push, setLayoutLoading, user]);

  const { mutate: handleNavigate, isPending: isNavigating } = useMutation({
    mutationFn: navigate,
  });

  return { handleNavigate: () => handleNavigate(), isNavigating };
};
