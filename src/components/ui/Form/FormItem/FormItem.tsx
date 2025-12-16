import { FC, PropsWithChildren } from 'react';
import { FormInputWrapper, FormItemWrapper, Label } from './styles';

type Options = {
  isError?: boolean;
  marginBottom?: number;
};

type Props = { label?: string; options: Options };

export const FormItem: FC<PropsWithChildren<Props>> = ({
  options: { isError, marginBottom = 0 },
  children,
  label,
}) => {
  return (
    <FormItemWrapper>
      {label ? <Label>{label}</Label> : null}
      <FormInputWrapper $isError={!!isError} $marginBottom={marginBottom}>
        {children}
      </FormInputWrapper>
    </FormItemWrapper>
  );
};
