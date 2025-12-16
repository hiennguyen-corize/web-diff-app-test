'use client';
import { auth } from '@/configs/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FC, useCallback, useEffect, useState } from 'react';

import { UserMetadataType } from '@/models/UserMetadataType';
import { Cookie, setCookie } from '@/utils/cookie';
import { AuthenticationContext } from './Authentication.context';
type Props = {
  children: React.ReactNode;
};

export const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<(User & Partial<UserMetadataType>) | null>();

  const handleUserMetaLocalStorage = useCallback(() => {
    try {
      const userMetaJson = localStorage.getItem('userMeta');
      if (userMetaJson) {
        const userMeta = JSON.parse(userMetaJson);
        setUser((prev) => ({ ...(prev || {}), ...userMeta }));
      }
    } catch (error) {
      // do nothing
    }
  }, []);

  const unsubscribe = useCallback(() => {
    onAuthStateChanged(auth, (changedState) => {
      if (changedState) {
        setUser((prev) => ({ ...prev, ...changedState }));

        setCookie(
          Cookie.ACCESS_TOKEN,
          changedState.stsTokenManager?.accessToken,
          changedState.stsTokenManager?.expirationTime
        );

        setCookie(
          Cookie.UUID,
          changedState.uid,
          changedState.stsTokenManager.expirationTime
        );
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    handleUserMetaLocalStorage();
  }, [handleUserMetaLocalStorage]);

  useEffect(() => {
    unsubscribe();
    return () => unsubscribe();
  }, [unsubscribe]);

  return (
    <AuthenticationContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
