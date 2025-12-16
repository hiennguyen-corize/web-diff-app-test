import { useCustomerSession } from '@/hooks/useCustomerSession.hooks';
import { handleStripeTable } from '@/utils/stripeTable';
import { useTransitionRouter } from 'next-view-transitions';
import Script from 'next/script';
import { FC, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  SkeletonWrapper,
  StripePricingTableContainer,
  StripePricingTableWrapper,
} from './styles';

type Props = { pricingTableId?: string; accessConditions: boolean[] };

export const StripePricingTable: FC<Props> = ({
  pricingTableId,
  accessConditions,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { push } = useTransitionRouter();

  useEffect(() => {
    if (!accessConditions.every(Boolean)) {
      push('/');
    }
  }, [accessConditions, push]);

  const { clientSecret, isClientSecretLoading, isClientSecretError } =
    useCustomerSession();

  useEffect(() => {
    if (tableRef.current && clientSecret) {
      tableRef.current.innerHTML = handleStripeTable(
        clientSecret,
        pricingTableId
      );
    }
  }, [clientSecret, pricingTableId]);

  return (
    <StripePricingTableWrapper>
      {isClientSecretError && <>Error when loading Stripe Pricing Table</>}

      {isClientSecretLoading ? (
        <SkeletonWrapper className='flex gap-10'>
          <Skeleton width={300} height={400} count={1} />
          <Skeleton width={300} height={400} count={1} />
        </SkeletonWrapper>
      ) : (
        <>
          <Script
            src='https://js.stripe.com/v3/pricing-table.js'
            defer
            strategy='afterInteractive'
          />

          <StripePricingTableContainer ref={tableRef} />
        </>
      )}
    </StripePricingTableWrapper>
  );
};
