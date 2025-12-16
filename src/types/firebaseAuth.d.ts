import 'firebase/auth';
import { CookieAttributes } from 'js-cookie';

declare module 'firebase/auth' {
  interface User {
    stsTokenManager: {
      accessToken: string;
      expirationTime: Pick<CookieAttributes, 'expires'>;
    };
    reloadUserInfo: User | null;
    localId: string;
  }
}
