import { BUTTON_TYPE } from '@/types';
import Image from 'next/image';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { ButtonWrapper } from './styles';

type ButtonOptions = {
  trailingIcon?: string;
  type: BUTTON_TYPE;
  title?: string;
  icon?: string;
};

type Props = {
  options: ButtonOptions;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ options, ...props }, ref) => {
    const { title, type, icon, trailingIcon } = options;

    return (
      <ButtonWrapper $type={type} {...props} ref={ref}>
        {icon && <Image src={icon} alt={title ?? 'icon'} />}
        {title}
        {trailingIcon && (
          <Image src={trailingIcon} alt={title ?? 'trailing icon'} />
        )}
      </ButtonWrapper>
    );
  }
);

Button.displayName = 'Button';
