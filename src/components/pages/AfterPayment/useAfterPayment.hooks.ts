'use client';
import { PAYMENT_RETRIEVE_POLLING_TIME } from '@/constants/polling';
import { CheckoutSessionType } from '@/models/StripeCheckoutSessionType';
import { retrieveCheckoutSession } from '@/services/payment';
import { AfterPaymentPageType, PaymentStatusType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useAfterPayment = () => {
  const [screenType, setScreenType] = useState<AfterPaymentPageType>(
    AfterPaymentPageType.COMPLETE
  );

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const onSuccess = useCallback((data: CheckoutSessionType) => {
    if (data?.status === PaymentStatusType.PAID) {
      setScreenType(AfterPaymentPageType.SUCCESS);
    }
  }, []);

  const handleGetPaymentInfo = useCallback(async () => {
    if (!sessionId) {
      return;
    }

    try {
      const response = await retrieveCheckoutSession({ sessionId });
      onSuccess(response.data);
      return response.data;
    } catch (error) {
      // do nothing
    }
  }, [onSuccess, sessionId]);

  const handlePolling = useCallback(
    (data: CheckoutSessionType | undefined) =>
      data?.status !== PaymentStatusType.PAID
        ? PAYMENT_RETRIEVE_POLLING_TIME
        : false,
    []
  );

  const { isLoading: isPaymentInfoLoading, data: paymentInfo } = useQuery({
    queryKey: ['retrieveCheckoutSession', sessionId],
    refetchInterval: ({ state: { data } }) => handlePolling(data),
    queryFn: handleGetPaymentInfo,
    refetchOnWindowFocus: false,
    enabled: !!sessionId,
    staleTime: Infinity,
  });

  return { isPaymentInfoLoading, paymentInfo, screenType };
};
