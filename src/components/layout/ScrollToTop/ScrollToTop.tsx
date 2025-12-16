import { FC } from 'react';
import { Arrow, ScrollToTopWrapper } from './styles';

type Props = {
  onClick: () => void;
};

export const ScrollToTop: FC<Props> = ({ onClick }) => {
  return (
    <ScrollToTopWrapper onClick={onClick}>
      <Arrow />
    </ScrollToTopWrapper>
  );
};
