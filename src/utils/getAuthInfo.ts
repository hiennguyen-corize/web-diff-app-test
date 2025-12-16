import { auth } from '@/configs/firebase';

export const getAuthInfo = () => {
  if (auth.currentUser) {
    const authInfo = auth.currentUser;
    return authInfo.reloadUserInfo;
  }
  return null;
};
