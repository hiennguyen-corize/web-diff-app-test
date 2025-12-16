import { Button } from '@/components/ui/Button';
import { BUTTON_TYPE } from '@/types';
import { FC } from 'react';
import { ButtonGroupWrapper } from './styles';

type Props = {
  onCancel: (event: React.MouseEvent) => void;
  isUpdating: boolean;
  disabled: boolean;
};

export const SubmitButtons: FC<Props> = ({
  onCancel,
  isUpdating,
  disabled,
}) => {
  return (
    <ButtonGroupWrapper>
      <Button
        disabled={disabled}
        options={{
          type: BUTTON_TYPE.SECONDARY_MINIMAL_LARGE,
          title: 'Cancel',
        }}
        onClick={onCancel}
        type='button'
      />

      <Button
        disabled={disabled}
        type='submit'
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title: isUpdating ? 'Updating...' : 'Update',
        }}
      />
    </ButtonGroupWrapper>
  );
};
