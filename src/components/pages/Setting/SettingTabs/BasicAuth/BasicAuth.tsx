import { FormItem } from '@/components/ui/Form/FormItem';
import { Input } from '@/components/ui/Form/Input';
import { SubmitButtons } from '@/components/ui/Setting/SubmitButtons';
import { FC, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { Container, Header, InputsWrapper } from './styles';
import { useBasicAuth } from './useBasicAuth.hooks';

export const BasicAuth: FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    disabled,
    notFound,
    basicAuth,
    isUpdating,
    handleCancel,
    handleSubmit,
    basicAuthLoading,
  } = useBasicAuth();

  if (notFound) {
    return <div>Not found</div>;
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Header>Basic Authentication</Header>

      <InputsWrapper>
        <Controller
          name='username'
          control={control}
          disabled={disabled}
          defaultValue={basicAuth?.username}
          rules={{
            required: 'Username is required',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem
              label='Username'
              options={{ isError: !!error?.message, marginBottom: 16 }}
            >
              <Input
                type='text'
                value={value}
                name='username'
                ref={firstInputRef}
                disabled={disabled}
                isError={!!error?.message}
                loading={basicAuthLoading}
                errorMessage={error?.message}
                placeholder='Enter your username'
                defaultValue={basicAuth?.username}
                onChange={onChange}
              />
            </FormItem>
          )}
        />

        <Controller
          name='password'
          control={control}
          disabled={disabled}
          defaultValue={basicAuth?.password}
          rules={{
            required: 'Password is required',
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem
              label='Password'
              options={{ isError: !!error?.message, marginBottom: 16 }}
            >
              <Input
                name='password'
                type='password'
                value={value}
                disabled={disabled}
                isError={!!error?.message}
                loading={basicAuthLoading}
                errorMessage={error?.message}
                placeholder='Enter your password'
                defaultValue={basicAuth?.password}
                onChange={onChange}
              />
            </FormItem>
          )}
        />
      </InputsWrapper>

      <SubmitButtons
        onCancel={handleCancel}
        isUpdating={isUpdating}
        disabled={disabled}
      />
    </Container>
  );
};
