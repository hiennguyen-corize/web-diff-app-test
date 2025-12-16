import { createContext } from 'react';

type AdminContextType = {
  isAdmin?: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};

export const AdminContext = createContext<AdminContextType>({
  isAdmin: undefined,
  setIsAdmin: () => {
    // do nothing
  },
});
