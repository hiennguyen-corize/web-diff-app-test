import { preventRoutes, unauthorizedRoutes } from '@/constants/routes';
import { useAdminContext } from '@/hooks/useAdminContext';
import useCurrentUser from '@/hooks/user.hook';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

export const useAuthor = () => {
  const { isAdmin } = useAdminContext();
  const { user } = useCurrentUser();
  const { push } = useRouter();
  const pathname = usePathname();

  const { isThisRoutePrevented, isThisRouteUnauthorized } = useMemo(
    () => ({
      isThisRoutePrevented: preventRoutes.some((preventRoute) =>
        pathname.startsWith(preventRoute)
      ),
      isThisRouteUnauthorized: unauthorizedRoutes.some((unauthorizedRoute) =>
        unauthorizedRoute.startsWith(pathname)
      ),
    }),
    [pathname]
  );

  const handleAuthor = useCallback(() => {
    if (isAdmin === true && !pathname.includes('/admin')) {
      push('/admin/projects');
    }

    if (isAdmin === false && pathname.includes('/admin')) {
      push('/projects');
    }

    if (user === null && isThisRoutePrevented) {
      push('/signin');
    }

    if (isAdmin && isThisRouteUnauthorized) {
      push('/admin/projects');
    }

    if (isAdmin === false && !!user && isThisRouteUnauthorized) {
      push('/projects');
    }
  }, [
    isAdmin,
    isThisRoutePrevented,
    isThisRouteUnauthorized,
    pathname,
    push,
    user,
  ]);

  useEffect(() => {
    handleAuthor();
  }, [handleAuthor]);

  return { isAdmin };
};
