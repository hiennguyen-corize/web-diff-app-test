import { Button } from '@/components/ui/Button';
import { AfterPaymentPageType, BUTTON_TYPE } from '@/types';
import { useTransitionRouter } from 'next-view-transitions';
import { FC } from 'react';
import { FailButtonWrapper, SuccessButtonWrapper } from './styles';

type Props = { type: AfterPaymentPageType };

export const NavigateButtons: FC<Props> = ({ type }) => {
  const { push } = useTransitionRouter();

  if (type === AfterPaymentPageType.FAIL) {
    return (
      <FailButtonWrapper>
        <Button
          onClick={() => push('/projects')}
          options={{
            type: BUTTON_TYPE.GHOST_DEFAULT_LARGE,
            title: 'Go back',
          }}
        />
        <Button
          onClick={() => push('/pricing')}
          options={{
            type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
            title: 'Try again',
          }}
        />
      </FailButtonWrapper>
    );
  }

  return (
    <SuccessButtonWrapper>
      <Button
        onClick={() => push('/projects')}
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title: 'Done',
        }}
      />
    </SuccessButtonWrapper>
  );
};
