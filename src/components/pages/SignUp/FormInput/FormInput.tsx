import { FC, PropsWithChildren } from 'react';
import { FormInputWrapper } from './styles';

type Options = {
  isError: boolean;
  marginBottom: number;
};

type Props = { options: Options };

export const FormInput: FC<PropsWithChildren<Props>> = ({
  options,
  children,
}) => {
  return (
    <FormInputWrapper
      $isError={options.isError}
      $marginBottom={options.marginBottom}
    >
      {children}
    </FormInputWrapper>
  );
};
