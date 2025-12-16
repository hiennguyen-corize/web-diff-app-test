'use client';
import { Input } from '@/components/ui/Form/Input';
import { Loading } from '@/components/ui/Loading';
import { MIN_PASSWORD_LENGTH } from '@/constants/common';
import { MAIL_REGEX } from '@/constants/regex';
import { useBooleanState } from '@/hooks/useBooleanState';
import { Controller, useForm } from 'react-hook-form';
import { PasswordInput } from './PasswordInput';
import { SignInWithOauth2 } from './SignInWithOauth2';
import { SignUpNavigate } from './SignUpNavigate';
import {
  InputWrap,
  InputWrapper,
  SignInContentWrapper,
  SignInForm,
  SignInSubTitle,
  SignInTitle,
  SignInWrapper,
  TitleWrapper,
} from './styles';
import { SubmitButton } from './SubmitButton';
import { useSignIn } from './useSiginIn.hooks';

export type LoginPayloadType = { email: string; password: string };

export const SignIn = () => {
  const {
    boolean: isOauthLoading,
    setTrue: setIsOauthLoadingTrue,
    setFalse: setIsOauthLoadingFalse,
  } = useBooleanState(false);

  const { handleLogin, isLoginPending } = useSignIn();

  const { control, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const isDisabled = isLoginPending || isOauthLoading;

  return (
    <SignInWrapper>
      {isDisabled && <Loading />}

      <SignInContentWrapper>
        <SignInForm
          onSubmit={handleSubmit(({ email, password }) =>
            handleLogin({ email, password })
          )}
        >
          <TitleWrapper>
            <SignInTitle>Welcome!</SignInTitle>
            <SignInSubTitle>Let’s get started now</SignInSubTitle>
          </TitleWrapper>

          <InputWrapper>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                pattern: {
                  value: MAIL_REGEX,
                  message: 'Invalid email address',
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputWrap $isError={!!error?.message}>
                  <Input
                    name='email'
                    type='text'
                    value={value}
                    disabled={isDisabled}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    placeholder='Enter your Email'
                    onChange={onChange}
                  />
                </InputWrap>
              )}
            />

            <Controller
              control={control}
              name='password'
              rules={{
                required: 'Password is required',
                minLength: {
                  value: MIN_PASSWORD_LENGTH,
                  message: `Password must be more than ${MIN_PASSWORD_LENGTH} characters`,
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <PasswordInput
                  value={value}
                  onChange={onChange}
                  disabled={isDisabled}
                  errorMessage={error?.message}
                />
              )}
            />

            <SubmitButton disabled={isDisabled} />
          </InputWrapper>

          <SignInWithOauth2
            setIsLoadingTrue={setIsOauthLoadingTrue}
            setIsLoadingFalse={setIsOauthLoadingFalse}
          />

          <SignUpNavigate />
        </SignInForm>
      </SignInContentWrapper>
    </SignInWrapper>
  );
};
