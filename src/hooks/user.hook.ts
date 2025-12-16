import { auth } from '@/configs/firebase';
import { useAuthenticated } from '@/hooks/auth.hook';
import { Cookie, removeCookie } from '@/utils/cookie';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { useTransitionRouter } from 'next-view-transitions';
import { useCallback } from 'react';
import { useAdminContext } from './useAdminContext';

const useCurrentUser = () => {
  const { push } = useTransitionRouter();
  const { user } = useAuthenticated();
  const queryClient = useQueryClient();
  const { setIsAdmin } = useAdminContext();

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      push('/signin');
      setIsAdmin(false);
      queryClient.clear();

      if (typeof window !== undefined) {
        localStorage.removeItem('userMeta');
      }

      removeCookie(Cookie.IS_LOCAL_ADMIN);
      removeCookie(Cookie.ACCESS_TOKEN);
      removeCookie(Cookie.UUID);
    } catch (error) {
      // do nothing
    }
  }, [push, queryClient, setIsAdmin]);

  return { user, logout };
};

export default useCurrentUser;
