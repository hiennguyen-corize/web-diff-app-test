import Image from 'next/image';
import { FC } from 'react';
import ArrowIcon from './assets/arrow.svg';

type Props = {
  hide: boolean;
};

export const HandleButton: FC<Props> = ({ hide }) => {
  if (hide) {
    return null;
  }

  return (
    <div className='handle-button-wrapper'>
      <Image src={ArrowIcon} alt='arrow-icon' />
      <Image src={ArrowIcon} alt='arrow-icon' />
    </div>
  );
};
