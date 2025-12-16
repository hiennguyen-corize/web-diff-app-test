import { SCROLL_Y_DISTANCE } from '@/constants/common';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useState } from 'react';

const ScrollToTopDynamic = dynamic<{ onClick: () => void }>(
  () => import('./ScrollToTop').then((mod) => mod.ScrollToTop),
  {
    ssr: false,
  }
);

/**
 * A reusable component that renders a scroll-to-top button.
 * The button is only visible when the user has scrolled down a certain distance.
 *
 * @return {JSX.Element} The scroll-to-top button component
 */
export const ScrollToTopContainer = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      setIsVisible(window.scrollY >= SCROLL_Y_DISTANCE)
    );
    return () =>
      window.removeEventListener('scroll', () =>
        setIsVisible(window.scrollY >= SCROLL_Y_DISTANCE)
      );
  }, []);

  return <>{isVisible && <ScrollToTopDynamic onClick={scrollToTop} />}</>;
});

ScrollToTopContainer.displayName = 'ScrollToTopContainer';
