'use client';
import { LOADING_ID } from '@/constants/common';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll.hooks';
import { FC, memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LoadingComponent } from './LoadingComponent';
import { LoadingContainer } from './styles';

export const Loading: FC = memo(({}) => {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useLockBodyScroll();

  useEffect(() => {
    const portalElement = document.getElementById(LOADING_ID);
    if (portalElement) {
      setPortalNode(portalElement);
    }
  }, []);

  return portalNode
    ? createPortal(
        <LoadingContainer>
          <LoadingComponent />
        </LoadingContainer>,
        portalNode
      )
    : null;
});

Loading.displayName = 'Loading';
