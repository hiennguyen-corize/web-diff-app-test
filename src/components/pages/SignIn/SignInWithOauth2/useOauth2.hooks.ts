import { auth } from '@/configs/firebase';
import { REGISTER_ERRORS } from '@/constants/errors/authenticationErrors';
import { useAuthenticated } from '@/hooks/auth.hook';
import { useAdminContext } from '@/hooks/useAdminContext';
import { useNotification } from '@/hooks/useNotification';
import { addUserMeta, getUserMetadata } from '@/services/user';
import { USER_PLANS_TYPE, USER_RULE_TYPE } from '@/types';
import { Cookie, setCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { debounce } from 'lodash';
import { useTransitionRouter } from 'next-view-transitions';

export const useOauth2 = (
  setIsLoadingTrue: () => void,
  setIsLoadingFalse: () => void
) => {
  const setIsLoadingFalseDelay = () => debounce(() => setIsLoadingFalse(), 300);
  const { setNotification } = useNotification();
  const { setIsAdmin } = useAdminContext();
  const { setUser } = useAuthenticated();
  const { push } = useTransitionRouter();

  const handleLoginGoogle = async () => {
    try {
      setIsLoadingTrue();
      auth.languageCode = 'en';
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const userMeta = await getUserMetadata(user.uid);
      const isAdmin = userMeta?.rule === USER_RULE_TYPE.ADMIN;

      const dataUserMeta = {
        userId: user.uid,
        type: USER_PLANS_TYPE.FREE,
        rule: USER_RULE_TYPE.USER,
      };

      if (!userMeta) {
        await addUserMeta(dataUserMeta, user.uid);
      }

      if (isAdmin) {
        setIsAdmin(true);
        setCookie(Cookie.IS_LOCAL_ADMIN, JSON.stringify(true));
      }

      setUser({ ...user });
      push(isAdmin ? '/admin/projects' : '/projects');
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Login failed. Please try again!',
      });
    } finally {
      setIsLoadingFalseDelay();
    }
  };

  const handleLoginGithub = async () => {
    try {
      setIsLoadingTrue();
      auth.languageCode = 'en';
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userMeta = await getUserMetadata(user.uid);
      const isAdmin = userMeta?.rule === USER_RULE_TYPE.ADMIN;

      const dataUserMeta = {
        userId: user.uid,
        type: USER_PLANS_TYPE.FREE,
        rule: USER_RULE_TYPE.USER,
      };

      if (!userMeta) {
        await addUserMeta(dataUserMeta, user.uid);
      }

      if (isAdmin) {
        setIsAdmin(true);
        setCookie(Cookie.IS_LOCAL_ADMIN, JSON.stringify(true));
      }

      localStorage.setItem('userMeta', JSON.stringify(userMeta));
      setUser({ ...user, ...userMeta });
      push(isAdmin ? '/admin/projects' : '/projects');
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
    } finally {
      setIsLoadingFalseDelay();
    }
  };

  const { mutate: loginWithGoogle } = useMutation({
    mutationFn: handleLoginGoogle,
  });

  const { mutate: loginWithGithub } = useMutation({
    mutationFn: handleLoginGithub,
  });

  return {
    loginWithGoogle,
    loginWithGithub,
  };
};
