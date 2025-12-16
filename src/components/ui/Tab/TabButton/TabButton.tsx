import { FC } from 'react';
import { TitleWrapper } from './styles';

type Props = {
  title: string;
  isActive: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const TabButton: FC<Props> = ({ title, isActive, ...props }) => {
  return (
    <TitleWrapper $isActive={isActive} {...props}>
      {title}
    </TitleWrapper>
  );
};
