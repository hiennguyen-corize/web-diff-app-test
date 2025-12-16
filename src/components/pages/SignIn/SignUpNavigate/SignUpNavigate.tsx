import { FC } from 'react';
import { SignUpLink, SignUpNavigateWrapper } from './styles';

export const SignUpNavigate: FC = () => {
  return (
    <SignUpNavigateWrapper>
      Don’t you have an account?
      <SignUpLink href='/signup'>Sign up</SignUpLink>
    </SignUpNavigateWrapper>
  );
};
