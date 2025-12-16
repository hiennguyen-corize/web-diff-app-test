import { Button } from '@/components/ui/Button';
import { DATE_OF_THE_MONTH } from '@/constants/time';
import useCurrentUser from '@/hooks/user.hook';
import { BUTTON_TYPE, USER_PLANS_TYPE } from '@/types';
import { isUserPlanIdType } from '@/utils/payment';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import {
  Badge,
  Description,
  HalfLeft,
  HalfRight,
  HalfRow,
  StorageBuy,
  Title,
} from './styles';

export const ViewTestHistoryBuy = () => {
  const { user } = useCurrentUser();
  const { push } = useRouter();

  const storageDays = useMemo(() => {
    const storageTime = user?.storageTime;

    if (typeof storageTime !== 'number') {
      return 0;
    }

    return storageTime * DATE_OF_THE_MONTH;
  }, [user?.storageTime]);

  const { upgrade, addOns } = useMemo(
    () => ({
      upgrade: {
        condition:
          isUserPlanIdType(user?.type) && user?.type === USER_PLANS_TYPE.FREE,
        buttonTitle: 'Compare plans',
        description: `Test history are hidden after ${storageDays} days. Upgrade to a paid plan to access your test history`,
        onClick: () => push('/pricing'),
      },
      addOns: {
        condition:
          isUserPlanIdType(user?.type) && user?.type !== USER_PLANS_TYPE.FREE,
        buttonTitle: 'Add ons',
        description: `Your test history is stored for ${storageDays} days. Paid plans have longer storage by default. Purchase additional storage to keep your history even longer.`,
        onClick: () => push('/buy-add-ons'),
      },
    }),
    [push, storageDays, user?.type]
  );

  const description =
    (upgrade.condition ? upgrade.description : '') ||
    (addOns.condition ? addOns.description : '');

  const buttonTitle =
    (upgrade.condition ? upgrade.buttonTitle : '') ||
    (addOns.condition ? addOns.buttonTitle : '');

  const handleClick =
    (upgrade.condition ? upgrade.onClick : undefined) ||
    (addOns.condition ? addOns.onClick : undefined);

  return (
    <StorageBuy>
      <HalfLeft>
        <HalfRow>
          <Title>View test history older than {storageDays} days</Title>
          <Badge>Paying</Badge>
        </HalfRow>
        <HalfRow>
          <Description>{description}</Description>
        </HalfRow>
      </HalfLeft>
      <HalfRight>
        <Button
          onClick={handleClick}
          options={{
            type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
            title: buttonTitle,
          }}
        />
      </HalfRight>
    </StorageBuy>
  );
};
