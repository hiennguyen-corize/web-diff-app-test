import { FC } from 'react';
import { LineElement } from './styles';

type Props = {
  options: {
    marginTop?: number;
    marginBottom?: number;
    direction?: 'horizontal' | 'vertical';
  };
};

export const Line: FC<Props> = ({
  options: { marginTop = 0, marginBottom = 0, direction = 'horizontal' },
}) => {
  return (
    <LineElement
      $marginTop={marginTop}
      $marginBottom={marginBottom}
      $direction={direction}
    />
  );
};
