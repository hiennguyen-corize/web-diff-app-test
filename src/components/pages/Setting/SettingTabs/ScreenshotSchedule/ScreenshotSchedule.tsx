import { Checkbox } from '@/components/ui/Form/Checkbox';
import { SubmitButtons } from '@/components/ui/Setting/SubmitButtons';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { SelectTime } from './SelectTime';
import { CheckLabel, ScreenshotScheduleWrapper } from './styles';
import { useScreenshotSchedule } from './useScreenshotSchedule.hooks';
import { useScreenshotScheduleDefaultValue } from './useScreenshotScheduleDefaultValue.hooks';

export const ScreenshotSchedule: FC = () => {
  const { control, onSubmit, isDisabled, resetForm, isSubmitting, notFound } =
    useScreenshotSchedule();

  const { handleCancel } = useScreenshotScheduleDefaultValue(resetForm);

  if (notFound) {
    return <div>Not found</div>;
  }

  return (
    <ScreenshotScheduleWrapper onSubmit={onSubmit}>
      <Controller
        control={control}
        name='isActive'
        render={({ field: { onChange, value } }) => (
          <CheckLabel>
            Set up Auto Screenshot Schedule
            <Checkbox
              onChange={(event) => onChange(event.target.checked)}
              checked={value}
            />
          </CheckLabel>
        )}
      />

      <SelectTime control={control} />

      <SubmitButtons
        onCancel={handleCancel}
        isUpdating={isSubmitting}
        disabled={isDisabled}
      />
    </ScreenshotScheduleWrapper>
  );
};
