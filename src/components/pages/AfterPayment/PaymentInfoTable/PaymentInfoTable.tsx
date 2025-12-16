import { CheckoutSessionType } from '@/models/StripeCheckoutSessionType';
import { formatPrice } from '@/utils/formatPrice';
import dayjs from 'dayjs';
import { FC, memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { PlanNameWrapper, ReferenceText, Table, Td, Th } from './styles';

type Props = {
  isPaymentInfoLoading: boolean;
  paymentInfo?: CheckoutSessionType;
};

export const PaymentInfoTable: FC<Props> = memo(
  ({ isPaymentInfoLoading, paymentInfo }) => {
    if (isPaymentInfoLoading) {
      return <Skeleton height={39} count={4} />;
    }

    if (!paymentInfo) {
      return null;
    }

    return (
      <Table>
        <tbody>
          <tr>
            <Th>Total payment</Th>
            <Td>{formatPrice(paymentInfo.product.price)}</Td>
          </tr>
          <tr>
            <Th>Plan</Th>
            <Td>
              <PlanNameWrapper>
                {`${paymentInfo.product.name} MONTHLY`.toLowerCase()}
              </PlanNameWrapper>
            </Td>
          </tr>
          {!!paymentInfo.subscriptionId && (
            <tr>
              <Th>Reference</Th>
              <Td>
                <ReferenceText>{paymentInfo.subscriptionId}</ReferenceText>
              </Td>
            </tr>
          )}
          <tr>
            <Th>Payment time</Th>
            <Td>
              {dayjs(paymentInfo.paymentTime).format('hh:mmA MM/DD/YYYY')}
            </Td>
          </tr>
        </tbody>
      </Table>
    );
  }
);

PaymentInfoTable.displayName = 'PaymentInfoTable';
