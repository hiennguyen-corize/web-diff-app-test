import { Loading } from '@/components/ui/Loading';
import { atom, useAtomValue } from 'jotai';
import { FC, memo, PropsWithChildren } from 'react';
import { ContentWrapper } from './styles';

type Props = {
  isAdmin: boolean | undefined;
};

export const layoutLoadingAtom = atom(false);

export const LayoutLoading: FC<PropsWithChildren<Props>> = memo(
  ({ children, isAdmin = undefined }) => {
    const isLayoutLoading = useAtomValue(layoutLoadingAtom);

    if (isAdmin === undefined || isLayoutLoading) {
      return <Loading />;
    }

    return <ContentWrapper>{children}</ContentWrapper>;
  }
);

LayoutLoading.displayName = 'LayoutLoading';
