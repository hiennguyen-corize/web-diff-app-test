import { Button } from '@/components/ui/Button';
import { BUTTON_TYPE } from '@/types';
import { FC } from 'react';
import { SubmitButtonWrapper } from './styles';

type Props = {
  disabled: boolean;
};

export const SubmitButton: FC<Props> = ({ disabled }) => {
  return (
    <SubmitButtonWrapper>
      <Button
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title: 'Sign In',
        }}
        disabled={disabled}
        type='submit'
      />
    </SubmitButtonWrapper>
  );
};
