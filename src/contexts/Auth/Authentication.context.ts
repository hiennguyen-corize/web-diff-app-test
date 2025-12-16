import { UserMetadataType } from '@/models/UserMetadataType';
import { User } from 'firebase/auth';
import React, { SetStateAction } from 'react';

type AuthenticationContextType = {
  user: (User & Partial<UserMetadataType>) | null | undefined;
  setUser: React.Dispatch<
    SetStateAction<(User & Partial<UserMetadataType>) | null | undefined>
  >;
};

export const AuthenticationContext =
  React.createContext<AuthenticationContextType>({
    user: null,
    setUser: () => null,
  });
