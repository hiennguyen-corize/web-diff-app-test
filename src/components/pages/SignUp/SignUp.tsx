'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form/Input';
import { Loading } from '@/components/ui/Loading';
import { MIN_PASSWORD_LENGTH } from '@/constants/common';
import { MAIL_REGEX } from '@/constants/regex';
import { BUTTON_TYPE } from '@/types';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { SignInNavigate } from './SignInNavigate';
import {
  FormWrapper,
  SignUpFormSubTitle,
  SignUpFormTitle,
  SubmitButtonWrapper,
  TitleWrapper,
} from './styles';
import { useSignUp } from './useSignUp.hooks';

export const SignUp = () => {
  const password = useRef('');

  const { watch, control, handleSubmit } = useForm({
    defaultValues: { email: '', password: '', confirm_password: '' },
  });

  password.current = watch('password', '');

  const { registerUser, isRegistering } = useSignUp();

  return (
    <section>
      {isRegistering && <Loading />}
      <div>
        <FormWrapper
          onSubmit={handleSubmit(({ email, password }) =>
            registerUser({ email, password })
          )}
        >
          <TitleWrapper>
            <SignUpFormTitle>Create your account</SignUpFormTitle>
            <SignUpFormSubTitle>
              It’s totally free and super easy
            </SignUpFormSubTitle>
          </TitleWrapper>

          <div>
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
                <FormInput
                  options={{ isError: !!error?.message, marginBottom: 16 }}
                >
                  <Input
                    name='email'
                    type='text'
                    value={value}
                    disabled={isRegistering}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    placeholder='Enter your Email'
                    onChange={onChange}
                  />
                </FormInput>
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
                <FormInput
                  options={{ isError: !!error?.message, marginBottom: 16 }}
                >
                  <Input
                    name='password'
                    type='password'
                    value={value}
                    disabled={isRegistering}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    placeholder='Enter your password'
                    onChange={onChange}
                  />
                </FormInput>
              )}
            />

            <Controller
              control={control}
              name='confirm_password'
              rules={{
                required: 'Password is required',
                minLength: {
                  value: MIN_PASSWORD_LENGTH,
                  message: `Password must be more than ${MIN_PASSWORD_LENGTH} characters`,
                },
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormInput
                  options={{ isError: !!error?.message, marginBottom: 24 }}
                >
                  <Input
                    value={value}
                    type='password'
                    name='confirm_password'
                    disabled={isRegistering}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    placeholder='Enter your password'
                    onChange={onChange}
                  />
                </FormInput>
              )}
            />

            <SubmitButtonWrapper>
              <Button
                type='submit'
                disabled={isRegistering}
                options={{
                  type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
                  title: 'Sign up',
                }}
              />
            </SubmitButtonWrapper>
          </div>

          <SignInNavigate />
        </FormWrapper>
      </div>
    </section>
  );
};
