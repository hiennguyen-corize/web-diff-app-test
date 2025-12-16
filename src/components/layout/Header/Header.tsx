'use client';
import { memo } from 'react';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { HeaderWrap, HeaderWrapper } from './styles';

/**
 * A functional component that renders the header of the application.
 *
 * It utilizes the `useSetAtom` hook from Jotai to update the `headerHeightAtom` state
 * with the client height of the header element.
 *
 * The component also uses the `useCallback` hook to memoize the `handleHeight` function,
 * which is used as a ref callback to update the header height state.
 *
 * @return {JSX.Element} The JSX element representing the header component.
 */
export const Header = memo(() => {
  return (
    <HeaderWrapper>
      <HeaderWrap>
        <Logo />
        <Navbar />
      </HeaderWrap>
    </HeaderWrapper>
  );
});

Header.displayName = 'Header';
