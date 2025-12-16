import { LoginPayloadType } from '@/components/pages/SignIn';
import { auth } from '@/configs/firebase';
import { REGISTER_ERRORS } from '@/constants/errors/authenticationErrors';
import { useAuthenticated } from '@/hooks/auth.hook';
import { useNotification } from '@/hooks/useNotification';
import { addUserMeta } from '@/services/user';
import { USER_PLANS_TYPE, USER_RULE_TYPE } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useTransitionRouter } from 'next-view-transitions';
import { useCallback } from 'react';

type RegisterPayloadType = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  const { setNotification } = useNotification();
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

        const userUid = userCredential.user.uid;

        const dataUserMeta = {
          userId: userUid,
          rule: USER_RULE_TYPE.USER,
          type: USER_PLANS_TYPE.FREE,
        };

        await addUserMeta(dataUserMeta, userUid);
        setUser({ ...userCredential.user });
        push('/projects');
      } catch (error) {
        if (error instanceof FirebaseError) {
          setNotification({
            type: 'error',
            message: error.message,
          });
        }
      }
    },
    [push, setNotification, setUser]
  );

  const register = useCallback(
    async ({ email, password }: RegisterPayloadType) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setNotification({
          type: 'success',
          message: 'User register successfully!',
        });

        await login({ email, password });
      } catch (error) {
        if (error instanceof FirebaseError) {
          const key = error.code;
          if (key in REGISTER_ERRORS) {
            setNotification({
              type: 'error',
              message: REGISTER_ERRORS[key] ?? '',
            });
          }
        }
      }
    },
    [login, setNotification]
  );

  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: register,
  });

  return {
    registerUser,
    isRegistering,
  };
};
