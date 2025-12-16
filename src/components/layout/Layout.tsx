'use client';
import { LOADING_ID, MODAL_ID } from '@/constants/common';
import { FC, PropsWithChildren } from 'react';
import { Background } from './Background';
import { Header } from './Header';
import { LayoutLoading } from './LayoutLoading';
import { LayoutProvider } from './LayoutProvider';
import { ScrollToTopContainer } from './ScrollToTop';
import { ContentWrapper, LayoutWrapper, RootModalPortal } from './styles';
import { useAuthor } from './useAuthor.hooks';

/**
 * A top-level layout component that wraps the entire application.
 * It handles admin authentication, resets commits, and renders the background, header, and content.
 *
 * @param {PropsWithChildren} children - The child components to be rendered within the layout.
 * @return {JSX.Element} The rendered layout component.
 */
export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { isAdmin } = useAuthor();

  return (
    <>
      <LayoutProvider />
      <LayoutWrapper>
        <div id={LOADING_ID} />
        <RootModalPortal id={MODAL_ID} />
        <LayoutLoading isAdmin={isAdmin}>
          <Header />
          <ContentWrapper>{children}</ContentWrapper>
          <ScrollToTopContainer />
        </LayoutLoading>
      </LayoutWrapper>
      <Background />
    </>
  );
};

Layout.displayName = 'Layout';
