import { CommonDropdown } from '@/components/ui/CommonDropdown';
import { useNavigateUpgrade } from '@/hooks/useNavigateUpgrade.hooks';
import { USER_PLANS_TYPE } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import ArrowIcon from './assets/arrow.svg';
import cardIcon from './assets/card.svg';
import logoutIcon from './assets/logout.svg';
import vipIcon from './assets/vip.svg';
import { DropdownWrapper } from './styles';

type Props = {
  userType?: USER_PLANS_TYPE;
  userDisplayName: string | null;
  userEmail: string | null;
  logout: () => void;
};

const accountDropdownPosition = {
  optionRight: -40,
  arrowRight: 25,
  optionTop: 50,
  arrowTop: -13,
};

export const AccountDropdown: FC<Props> = ({
  logout,
  userType,
  userDisplayName,
  userEmail,
}) => {
  const { handleNavigate } = useNavigateUpgrade();

  const options = [
    {
      value: 0,
      label: 'Subscription & Billing',
      icon: cardIcon,
      onClick: handleNavigate,
    },
    {
      value: 1,
      label: 'Log out',
      icon: logoutIcon,
      onClick: () => logout(),
    },
  ];

  const isVipIconShow = !!userType && userType !== USER_PLANS_TYPE.FREE;

  return (
    <DropdownWrapper>
      {isVipIconShow && <Image src={vipIcon} alt='vip-icon' />}
      <CommonDropdown
        dropdownPosition={accountDropdownPosition}
        selected={{
          label: userDisplayName ?? userEmail ?? '',
        }}
        selectedIcon={ArrowIcon}
        options={options}
      />
    </DropdownWrapper>
  );
};
