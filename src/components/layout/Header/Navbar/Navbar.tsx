import { isPlanLoadingAtom } from '@/components/layout/LayoutProvider';
import useCurrentUser from '@/hooks/user.hook';
import { USER_PLANS_TYPE } from '@/types';
import { isUserPlanIdType } from '@/utils/payment';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AccountDropdown } from './AccountDropdown';
import { ScreenshotSlotsShow } from './ScreenshotSlotsShow';
import { NavbarWrapper } from './styles';
import { UpgradeButton } from './UpgradeButton';

export const Navbar: FC = () => {
  const isPlanLoading = useAtomValue(isPlanLoadingAtom);
  const { user, logout } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <NavbarWrapper>
      {isPlanLoading ? (
        <Skeleton width={173} height={52} count={1} />
      ) : (
        <>
          <UpgradeButton
            isHide={
              isUserPlanIdType(user.type) && user.type !== USER_PLANS_TYPE.FREE
            }
          />
          <ScreenshotSlotsShow />
        </>
      )}
      <AccountDropdown
        logout={logout}
        userType={user.type}
        userEmail={user.email}
        userDisplayName={user.displayName}
      />
    </NavbarWrapper>
  );
};
