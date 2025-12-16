import { AuthenticationContext } from '@/contexts/Auth';
import { useContext } from 'react';

export const useAuthenticated = () => {
  return useContext(AuthenticationContext);
};
