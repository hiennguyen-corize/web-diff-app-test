import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';
import { Oauth2ButtonWrapper, Title } from './styles';

type Props = {
  title: string;
  icon: string;
} & HTMLAttributes<HTMLDivElement>;

export const Oauth2Button: FC<Props> = ({ title, icon, ...props }) => {
  return (
    <Oauth2ButtonWrapper {...props}>
      <Image src={icon} alt={title} />
      <Title>{title}</Title>
    </Oauth2ButtonWrapper>
  );
};
