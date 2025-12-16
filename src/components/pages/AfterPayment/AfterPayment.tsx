'use client';
import { Line } from '@/components/ui/Line';
import { AfterPaymentPageType } from '@/types';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import FailIcon from './assets/fail.svg';
import ProcessingIcon from './assets/processing.svg';
import SuccessIcon from './assets/success.svg';
import { NavigateButtons } from './NavigateButtons';
import { PaymentInfoTable } from './PaymentInfoTable';
import {
  AfterPaymentModalContent,
  AfterPaymentModalWrapper,
  NotificationSubText,
  NotificationText,
  TopContent,
} from './styles';
import { useAfterPayment } from './useAfterPayment.hooks';

export const AfterPayment: FC = () => {
  const { screenType, paymentInfo, isPaymentInfoLoading } = useAfterPayment();

  const imageSection = useMemo(() => {
    const imageSectionValue = { image: '', alt: '' };

    switch (screenType) {
      case AfterPaymentPageType.SUCCESS:
        imageSectionValue.image = SuccessIcon;
        imageSectionValue.alt = 'success';
        break;
      case AfterPaymentPageType.FAIL:
        imageSectionValue.image = FailIcon;
        imageSectionValue.alt = 'fail';
        break;
      default:
        imageSectionValue.image = ProcessingIcon;
        imageSectionValue.alt = 'processing';
    }

    return (
      <Image
        width={100}
        height={100}
        src={imageSectionValue.image}
        alt={imageSectionValue.alt}
      />
    );
  }, [screenType]);

  const notificationText = useMemo(() => {
    switch (screenType) {
      case AfterPaymentPageType.SUCCESS:
        return 'Payment Success!';
      case AfterPaymentPageType.FAIL:
        return 'Payment Failed!';
      default:
        return 'Processing!';
    }
  }, [screenType]);

  const notificationSubText = useMemo(() => {
    switch (screenType) {
      case AfterPaymentPageType.SUCCESS:
        return 'Your payment has been successfully done.';
      case AfterPaymentPageType.FAIL:
        return 'Something went wrong. Try again later';
      default:
        return 'Your payment is being processed.';
    }
  }, [screenType]);

  return (
    <AfterPaymentModalWrapper>
      <AfterPaymentModalContent>
        <TopContent>
          {imageSection}

          <NotificationText>{notificationText}</NotificationText>

          <NotificationSubText>{notificationSubText}</NotificationSubText>
        </TopContent>

        <Line
          options={{
            marginTop: 18,
            marginBottom: 18,
          }}
        />

        <PaymentInfoTable
          paymentInfo={paymentInfo}
          isPaymentInfoLoading={isPaymentInfoLoading}
        />
      </AfterPaymentModalContent>

      <NavigateButtons type={screenType} />
    </AfterPaymentModalWrapper>
  );
};
