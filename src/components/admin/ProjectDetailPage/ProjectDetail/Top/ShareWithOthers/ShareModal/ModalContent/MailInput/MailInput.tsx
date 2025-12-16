import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Form/Input';
import { MAIL_REGEX } from '@/constants/regex';
import { useCollaborator } from '@/hooks/useCollaborator.hooks';
import { BUTTON_TYPE } from '@/types';
import { FC, memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MailInputWrapper } from './styles';

export const MailInput: FC = memo(() => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: '' },
  });

  const { handleAddCollaborator, isAddCollaboratorPending } =
    useCollaborator(reset);

  return (
    <MailInputWrapper
      onSubmit={handleSubmit(({ email }) => handleAddCollaborator(email))}
    >
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Input
            name='email'
            type='text'
            value={value}
            disabled={false}
            isError={!!error?.message}
            errorMessage={error?.message}
            placeholder='Invite others by name or email'
            onChange={onChange}
          />
        )}
      />
      <Button
        disabled={isAddCollaboratorPending}
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title: 'Invite',
        }}
      />
    </MailInputWrapper>
  );
});

MailInput.displayName = 'MailInput';
