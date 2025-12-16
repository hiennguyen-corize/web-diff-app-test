import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import useCurrentUser from '@/hooks/user.hook';
import { useScreenshotSlots } from '@/hooks/useScreenshotSlots.hooks';
import { BUTTON_TYPE, USER_PLANS_TYPE } from '@/types';
import { useTransitionRouter } from 'next-view-transitions';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import CameraIcon from './assets/camera.svg';
import PlusIcon from './assets/plus.svg';
import { ScreenshotSlotsShowWrapper } from './styles';

export const ScreenshotSlotsShow: FC = () => {
  const { user } = useCurrentUser();
  const { push } = useTransitionRouter();
  const disabled = user?.type === USER_PLANS_TYPE.FREE;

  const { isAddOnsScreenshotSlotsLoading, totalAddOnsScreenshotSlots } =
    useScreenshotSlots();

  return (
    <ScreenshotSlotsShowWrapper>
      {isAddOnsScreenshotSlotsLoading ? (
        <Skeleton width={173} height={52} count={1} />
      ) : (
        <Tooltip isShow={!disabled} content={'Buy add ons'}>
          <Button
            disabled={disabled}
            onClick={() => push('/buy-add-ons')}
            options={{
              type: BUTTON_TYPE.SECONDARY_DARK_LARGE,
              title: `${totalAddOnsScreenshotSlots?.used || 0}/${totalAddOnsScreenshotSlots?.screenshots || 20}`,
              icon: CameraIcon,
              trailingIcon: PlusIcon,
            }}
          />
        </Tooltip>
      )}
    </ScreenshotSlotsShowWrapper>
  );
};
