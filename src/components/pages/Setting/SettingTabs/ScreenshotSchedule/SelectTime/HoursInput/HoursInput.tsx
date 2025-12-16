import { NumberInput } from '@/components/pages/Setting/SettingTabs/ScreenshotSchedule/SelectTime/styles';
import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { MeasureElement } from './styles';

type Props = { value?: string; onFormatValue: (value: string) => void };

export type InputMethodsType = {
  focus: () => void;
  select: () => void;
};

const delayAction = (action: () => void) => setTimeout(action, 0);

export const HoursInput = memo(
  forwardRef<InputMethodsType, Props>(({ value = '', onFormatValue }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputWidth, setInputWidth] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => delayAction(() => inputRef.current?.focus()),
        select: () => delayAction(() => inputRef.current?.select()),
      }),
      []
    );

    return (
      <>
        <MeasureElement
          ref={(ref) => {
            ref && setInputWidth(ref.offsetWidth);
          }}
        >
          {value || ' '}
        </MeasureElement>
        <NumberInput
          placeholder='00'
          ref={inputRef}
          value={value}
          type='number'
          $width={inputWidth}
          onFocus={(event) => event.currentTarget.select()}
          onClick={(event) => event.currentTarget.select()}
          onChange={(event) => onFormatValue(event.target.value)}
        />
      </>
    );
  })
);

HoursInput.displayName = 'HoursInput';
