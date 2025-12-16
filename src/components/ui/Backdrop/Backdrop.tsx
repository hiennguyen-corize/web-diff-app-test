import { Loading } from '@/components/ui/Loading';
import { FC } from 'react';

type Props = {
  isShow?: boolean;
};

export const Backdrop: FC<Props> = ({ isShow = false }) => {
  return (
    <div
      className={`${isShow ? 'z-999999 opacity-100' : 'z-[-99] opacity-0'} fixed left-0 top-0  h-full w-full transition-all`}
    >
      <div className='h-full w-full bg-slate-900 opacity-80' />
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-50'>
        <Loading />
      </div>
    </div>
  );
};
