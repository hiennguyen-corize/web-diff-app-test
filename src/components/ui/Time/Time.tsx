import dayjs from 'dayjs';
import { FC } from 'react';
import { TimeWrapper } from './styles';

type Props = {
  time: string;
  gap?: number;
};

/**
 * Time component renders a time string in the format "DD/MM/YYYY HH:mm:ss".
 *
 * @param time - Time string to be rendered.
 * @param gap - Optional gap between date and time elements.
 * @returns A JSX element rendering the formatted time string.
 */
export const Time: FC<Props> = ({ time, gap }) => {
  return (
    <TimeWrapper $gap={gap}>
      <div>{dayjs(time).format('DD/MM/YYYY')}</div>
      <div>{dayjs(time).format('HH:mm:ss')}</div>
    </TimeWrapper>
  );
};
