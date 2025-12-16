import { AfterPayment } from '@/components/pages/AfterPayment';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

export const metadata = {
  title: 'Web Diff - Payment Completed',
};

export default function checkoutCompletedPage() {
  return (
    <Suspense fallback={<Skeleton width='100%' height='100%' count={10} />}>
      <AfterPayment />
    </Suspense>
  );
}
