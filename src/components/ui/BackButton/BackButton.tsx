import Image from 'next/image';
import { FC } from 'react';
import BackIcon from './assets/back.svg';
import { BackButtonWrapper, Text } from './styles';

type Props = {
  back: () => void;
};

export const BackButton: FC<Props> = ({ back }) => {
  return (
    <div>
      <BackButtonWrapper onClick={back}>
        <Image src={BackIcon} alt='back icon' />
        <Text>Back</Text>
      </BackButtonWrapper>
    </div>
  );
};
