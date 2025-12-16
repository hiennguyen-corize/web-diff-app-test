import { FC, PropsWithChildren } from 'react';
import { CommonSectionWrapper, Content, Title } from './styles';

type Props = {
  title: string;
};

export const CommonSection: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return (
    <CommonSectionWrapper>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </CommonSectionWrapper>
  );
};
