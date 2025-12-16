import { auth } from '@/configs/firebase';
import { REGISTER_ERRORS } from '@/constants/errors/authenticationErrors';
import { useAuthenticated } from '@/hooks/auth.hook';
import { useAdminContext } from '@/hooks/useAdminContext';
import { useNotification } from '@/hooks/useNotification';
import { getUserMetadata } from '@/services/user';
import { USER_RULE_TYPE } from '@/types';
import { Cookie, setCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTransitionRouter } from 'next-view-transitions';
import { useCallback } from 'react';
import { LoginPayloadType } from './SignIn';

export const useSignIn = () => {
  const { setNotification } = useNotification();
  const { setIsAdmin } = useAdminContext();
  const { setUser } = useAuthenticated();
  const { push } = useTransitionRouter();

  const login = useCallback(
    async ({ email, password }: LoginPayloadType) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        setNotification({
          type: 'success',
          message: 'User login successfully!',
        });

        const userMeta = await getUserMetadata(userCredential.user.uid);
        const isAdmin = userMeta?.rule === USER_RULE_TYPE.ADMIN;

        if (isAdmin) {
          setIsAdmin(true);
          setCookie(Cookie.IS_LOCAL_ADMIN, JSON.stringify(true));
        }

        setUser({ ...userCredential.user });
        push(isAdmin ? '/admin' : '/projects');
      } catch (error) {
        if (!(error instanceof FirebaseError)) {
          setNotification({
            type: 'error',
            message: 'Login failed. Please try again!',
          });

          return;
        }

        const key = error.code;
        if (key in REGISTER_ERRORS) {
          setNotification({
            type: 'error',
            message: REGISTER_ERRORS[key] ?? 'Login failed. Please try again!',
          });
        }
      }
    },
    [push, setIsAdmin, setNotification, setUser]
  );

  const { mutate: handleLogin, isPending: isLoginPending } = useMutation({
    mutationFn: login,
  });

  return {
    handleLogin,
    isLoginPending,
  };
};
