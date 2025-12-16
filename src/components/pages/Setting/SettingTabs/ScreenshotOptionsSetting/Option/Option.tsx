import { Input } from '@/components/ui/Form/Input';
import { ScreenshotOptionType } from '@/models/ScreenshotOptionType';
import Image from 'next/image';
import { FC, memo } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import TrashIcon from './assets/Trash.svg';
import {
  FormFieldTitle,
  FormTitleWrapper,
  InputGroupWrapper,
  InputWrappers,
  SettingIconButton,
} from './styles';

type Props = {
  loading?: boolean;
  disabled: boolean;
  isHidden?: boolean;
  removeField: (id: string) => void;
  control: Control<FieldValues, string>;
  option: Omit<ScreenshotOptionType, 'createdAt'>;
};

export const Option: FC<Props> = memo(
  ({ disabled, removeField, isHidden, option, control, loading }) => {
    if (isHidden) {
      return null;
    }

    return (
      <InputGroupWrapper>
        <FormTitleWrapper>
          <FormFieldTitle>Variable name</FormFieldTitle>
          <FormFieldTitle>Value</FormFieldTitle>
        </FormTitleWrapper>

        <InputWrappers>
          <Controller
            control={control}
            disabled={disabled}
            defaultValue={option.key}
            name={`${option.id}-key`}
            rules={{
              required: 'Variable name is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type='text'
                value={value}
                loading={loading}
                disabled={disabled}
                onChange={onChange}
                defaultValue={option.key}
                name={`${option.id}-key`}
                isError={!!error?.message}
                placeholder='Variable name'
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            disabled={disabled}
            name={`${option.id}-value`}
            defaultValue={option.value}
            rules={{
              required: 'Value is required',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type='text'
                value={value}
                loading={loading}
                onChange={onChange}
                disabled={disabled}
                placeholder='Value'
                isError={!!error?.message}
                name={`${option.id}-value`}
                errorMessage={error?.message}
              />
            )}
          />

          <SettingIconButton
            type='button'
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation();
              removeField(option.id);
            }}
          >
            <Image src={TrashIcon} alt='delete-icon' width={24} height={24} />
          </SettingIconButton>
        </InputWrappers>
      </InputGroupWrapper>
    );
  }
);

Option.displayName = 'Option';
