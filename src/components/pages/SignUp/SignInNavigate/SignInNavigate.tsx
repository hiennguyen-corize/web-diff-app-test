import { FC } from 'react';
import { NavigateLink, SignInNavigateText } from './styles';

export const SignInNavigate: FC = () => {
  return (
    <SignInNavigateText>
      Already have an account
      <NavigateLink href='/signin'>Sign in</NavigateLink>
    </SignInNavigateText>
  );
};
