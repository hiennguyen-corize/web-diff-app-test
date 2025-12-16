import LogoImage from '@/../public/images/logo/logo-2.svg';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { FC } from 'react';
import { LogoWrapper } from './styles';

export const Logo: FC = () => {
  return (
    <LogoWrapper>
      <Link href='/projects'>
        <Image priority alt='logo' src={LogoImage} fetchPriority='low' />
      </Link>
    </LogoWrapper>
  );
};
