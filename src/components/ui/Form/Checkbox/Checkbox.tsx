import { FC, InputHTMLAttributes } from 'react';
import { CheckboxWrapper, CheckMark, InputCheckbox } from './styles';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<Props> = ({ checked = false, ...props }) => {
  return (
    <CheckboxWrapper>
      <InputCheckbox type='checkbox' {...props} />
      <CheckMark $checked={checked} />
    </CheckboxWrapper>
  );
};
