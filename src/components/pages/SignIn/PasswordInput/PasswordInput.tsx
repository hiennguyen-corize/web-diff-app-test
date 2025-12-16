import { Input } from '@/components/ui/Form/Input';
import { FC } from 'react';
import { PasswordInputWrapper } from './styles';

type Props = {
  value: string;
  disabled: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput: FC<Props> = ({
  value,
  disabled,
  errorMessage,
  onChange,
}) => {
  return (
    <PasswordInputWrapper>
      <Input
        name='password'
        type='password'
        value={value}
        disabled={disabled}
        isError={!!errorMessage}
        errorMessage={errorMessage}
        placeholder='Enter your password'
        onChange={onChange}
      />
    </PasswordInputWrapper>
  );
};
