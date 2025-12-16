import { ScreenshotScheduleFieldValuesType } from '@/components/pages/Setting/SettingTabs/ScreenshotSchedule';
import { FormItem } from '@/components/ui/Form/FormItem';
import { TIME_SUFFIXES_TYPE } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import ArrowImage from './assets/arrow.svg';
import { HoursInput } from './HoursInput';
import {
  ImageWrapper,
  InputWrap,
  NumberInput,
  SelectItem,
  SelectList,
  SelectSuffixWrapper,
  SelectTimeWrapper,
  Suffix,
} from './styles';
import { useSelectTimeUi } from './useSelecTimeUi.hooks';

const TIME_SUFFIXES = [TIME_SUFFIXES_TYPE.AM, TIME_SUFFIXES_TYPE.PM];

type Props = {
  control: Control<ScreenshotScheduleFieldValuesType>;
};

export const SelectTime: FC<Props> = ({ control }) => {
  const {
    handleFormatValue,
    isDropdownOpen,
    hoursInputRef,
    openDropdown,
    dropdownRef,
    closeDropdown,
  } = useSelectTimeUi();

  return (
    <FormItem
      label='Select time'
      options={{
        isError: false,
      }}
    >
      <SelectTimeWrapper ref={dropdownRef}>
        <InputWrap>
          <Controller
            control={control}
            name='hours'
            render={({ field: { onChange, value } }) => (
              <HoursInput
                value={value}
                ref={hoursInputRef}
                onFormatValue={(value) =>
                  handleFormatValue(value, true, onChange)
                }
              />
            )}
          />
          :
          <Controller
            control={control}
            name='minutes'
            render={({ field: { onChange, value } }) => (
              <NumberInput
                placeholder='00'
                type='number'
                value={value}
                onFocus={(event) => event.currentTarget.select()}
                onClick={(event) => event.currentTarget.select()}
                onChange={(event) =>
                  handleFormatValue(event.target.value, undefined, onChange)
                }
              />
            )}
          />
        </InputWrap>

        <Controller
          control={control}
          name='suffix'
          render={({ field: { onChange, value } }) => (
            <>
              <SelectSuffixWrapper onClick={openDropdown}>
                <Suffix>{value}</Suffix>
                <ImageWrapper $isActive={isDropdownOpen}>
                  <Image src={ArrowImage} alt='arrow' />
                </ImageWrapper>
              </SelectSuffixWrapper>

              {isDropdownOpen && (
                <SelectList>
                  {TIME_SUFFIXES.map((suffix) => (
                    <SelectItem
                      $isActive={value === suffix}
                      onClick={() => {
                        onChange(suffix);
                        closeDropdown();
                      }}
                      key={suffix}
                    >
                      {suffix}
                    </SelectItem>
                  ))}
                </SelectList>
              )}
            </>
          )}
        />
      </SelectTimeWrapper>
    </FormItem>
  );
};
