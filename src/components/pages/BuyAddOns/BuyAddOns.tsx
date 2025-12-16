'use client';
import useCurrentUser from '@/hooks/user.hook';
import { USER_PLANS_TYPE } from '@/types';
import { isUserPlanIdType } from '@/utils/payment';
import { FC, useMemo } from 'react';

import { StripePricingTable } from '@/components/ui/StripePricingTable';
import { STRIPE_ADD_ONS_PRICING_TABLE_ID } from '@/configs/stripe';

export const BuyAddOns: FC = () => {
  const { user } = useCurrentUser();

  const accessConditions = useMemo(
    () => [isUserPlanIdType(user?.type), user?.type !== USER_PLANS_TYPE.FREE],
    [user?.type]
  );

  return (
    <StripePricingTable
      pricingTableId={STRIPE_ADD_ONS_PRICING_TABLE_ID}
      accessConditions={accessConditions}
    />
  );
};
