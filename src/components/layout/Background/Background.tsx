import { blockBackgroundRoutes } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { FC, useCallback } from 'react';
import { BlocksBackground } from './BlocksBackground';
import { BackgroundWrapper } from './styles';

export const Background: FC = () => {
  const pathname = usePathname();

  const generateBackground = useCallback(() => {
    if (blockBackgroundRoutes.includes(pathname)) {
      return <BlocksBackground />;
    }
  }, [pathname]);

  return <BackgroundWrapper>{generateBackground()}</BackgroundWrapper>;
};
