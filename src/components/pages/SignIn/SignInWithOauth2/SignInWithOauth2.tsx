import { FC } from 'react';
import IconGithub from './assets/icon-github.svg';
import IconGoogle from './assets/icon-google.svg';
import { Oauth2Button } from './Oauth2Button';
import { ButtonWrapper, OauthTitle, SignInWithOauth2Wrapper } from './styles';
import { useOauth2 } from './useOauth2.hooks';

type Props = {
  setIsLoadingTrue: () => void;
  setIsLoadingFalse: () => void;
};

export const SignInWithOauth2: FC<Props> = ({
  setIsLoadingTrue,
  setIsLoadingFalse,
}) => {
  const { loginWithGoogle, loginWithGithub } = useOauth2(
    setIsLoadingTrue,
    setIsLoadingFalse
  );

  return (
    <SignInWithOauth2Wrapper>
      <OauthTitle>OR CONTINUE WITH</OauthTitle>

      <ButtonWrapper>
        <Oauth2Button
          title={'Google'}
          icon={IconGoogle}
          onClick={() => loginWithGoogle()}
        />
        <Oauth2Button
          title={'Github'}
          icon={IconGithub}
          onClick={() => loginWithGithub()}
        />
      </ButtonWrapper>
    </SignInWithOauth2Wrapper>
  );
};
