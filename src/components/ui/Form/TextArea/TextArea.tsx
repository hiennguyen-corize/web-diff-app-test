import { forwardRef, useImperativeHandle, useRef } from 'react';
import { ErrorMessage, InputWrap, InputWrapper, TextAreaInput } from './styles';

export type InputRefType = {
  focus: () => void;
};

type Props = {
  onChange: (value: string) => void;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  name: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<InputRefType, Props>(
  (
    {
      name,
      value,
      onChange,
      placeholder,
      errorMessage,
      isError = false,
      disabled = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        },
      }),
      []
    );

    return (
      <InputWrapper $isError={isError}>
        <InputWrap>
          <TextAreaInput
            name={name}
            value={value}
            ref={inputRef}
            $isError={isError}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
        </InputWrap>
        <ErrorMessage $isError={isError}>{errorMessage}</ErrorMessage>
      </InputWrapper>
    );
  }
);

TextArea.displayName = 'Input';
