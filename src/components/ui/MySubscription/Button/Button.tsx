import { ButtonHTMLAttributes, FC } from 'react';
import { ButtonWrapper } from './styles';

type Props = {
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ title, ...props }) => {
  return <ButtonWrapper {...props}>{title}</ButtonWrapper>;
};
