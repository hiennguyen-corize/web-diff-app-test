import { FC, ReactNode, useEffect, useState } from 'react';

import { Cookie, getCookie } from '@/utils/cookie';
import { AdminContext } from './Admin.context';

type Props = {
  children: ReactNode;
};

const LOADING_TIME = 1000;

export const AdminProvider: FC<Props> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const isLocalAdminJson = getCookie(Cookie.IS_LOCAL_ADMIN);

  useEffect(() => {
    if (isLocalAdminJson !== undefined && isAdmin === undefined) {
      const isLocalAdmin: boolean = JSON.parse(isLocalAdminJson);
      setIsAdmin(isLocalAdmin);
    }
  }, [isAdmin, isLocalAdminJson]);

  useEffect(() => {
    if (isAdmin === undefined) {
      const id = setTimeout(() => {
        setIsAdmin(false);
      }, LOADING_TIME);

      return () => clearTimeout(id);
    }
  }, [isAdmin]);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
