import { Button } from '@/components/ui/Button';
import { BUTTON_TYPE } from '@/types';
import { useTransitionRouter } from 'next-view-transitions';
import { FC } from 'react';
import { UpgradeButtonWrapper } from './styles';

type Props = {
  isHide: boolean;
};

export const UpgradeButton: FC<Props> = ({ isHide }) => {
  if (isHide) {
    return null;
  }

  const { push } = useTransitionRouter();

  return (
    <UpgradeButtonWrapper>
      <Button
        onClick={() => push('/pricing')}
        options={{ title: 'Upgrade', type: BUTTON_TYPE.NAVIGATE_UPGRADE }}
      />
    </UpgradeButtonWrapper>
  );
};
