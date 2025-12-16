import { STRIPE_PUBLISHABLE_KEY } from '@/configs/stripe';

export const handleStripeTable = (
  clientSecret: string,
  pricingTableId?: string
) => {
  if (!pricingTableId) {
    throw new Error('pricingTableId is not set');
  }

  return `<stripe-pricing-table
            pricing-table-id=${pricingTableId}
            publishable-key=${STRIPE_PUBLISHABLE_KEY}
            customer-session-client-secret="${clientSecret}"
          />`;
};
