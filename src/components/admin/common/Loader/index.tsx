import { FC } from 'react';

type Props = {
  position?: string;
  borderColor?: string;
};

const Loader: FC<Props> = ({ position, borderColor }) => {
  return (
    <div
      className={`flex h-5 w-5 items-center ${position ? position : 'justify-center'}`}
    >
      <div
        className={`color h-5 w-5 animate-spin rounded-full border-2 border-solid ${borderColor ? `border-${borderColor}` : 'border-primary'}  border-t-transparent`}
      />
    </div>
  );
};

export default Loader;
