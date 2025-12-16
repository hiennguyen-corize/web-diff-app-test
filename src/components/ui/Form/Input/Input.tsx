import { useBooleanState } from '@/hooks/useBooleanState';
import {
  forwardRef,
  HTMLInputTypeAttribute,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import EyeIcon from './assets/eye.svg';
import EyeHideIcon from './assets/eyeHide.svg';
import {
  CustomSkeleton,
  ErrorMessage,
  Eye,
  EyeWrapper,
  InputText,
  InputWrap,
  InputWrapper,
} from './styles';

export type InputRefType = {
  focus: () => void;
  select: () => void;
};

type Props = {
  onChange?: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  isError?: boolean;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<InputRefType, Props>(
  (
    {
      name,
      type,
      value,
      onChange,
      placeholder,
      errorMessage,
      loading = false,
      isError = false,
      disabled = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { boolean: isShowPassword, toggle } = useBooleanState(false);

    const isShowEye = useMemo(() => type === 'password', [type]);

    const eyeElement = useMemo(
      () => (isShowPassword ? EyeHideIcon : EyeIcon),
      [isShowPassword]
    );

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        },
        select() {
          setTimeout(() => {
            inputRef.current?.select();
          }, 0);
        },
      }),
      []
    );

    return (
      <InputWrapper $isError={isError}>
        <InputWrap>
          {loading && <CustomSkeleton count={1} />}
          <InputText
            $isShow={!loading}
            name={name}
            value={value}
            ref={inputRef}
            $isError={isError}
            disabled={disabled}
            placeholder={placeholder}
            type={isShowPassword ? 'text' : type}
            onChange={(event) => onChange?.(event.target.value)}
          />
          {isShowEye && (
            <EyeWrapper>
              <Eye src={eyeElement} alt='eye' onClick={toggle} />
            </EyeWrapper>
          )}
        </InputWrap>
        <ErrorMessage $isError={isError}>{errorMessage}</ErrorMessage>
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
