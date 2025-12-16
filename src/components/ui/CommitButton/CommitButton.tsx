import { COMMIT_BUTTON_TYPE } from '@/types';
import Image from 'next/image';
import { DOMAttributes, FC, memo, useMemo } from 'react';
import ApproveIcon from './assets/approve.svg';
import CancelIcon from './assets/cancel.svg';
import RejectIcon from './assets/reject.svg';
import { ButtonWrapper } from './styles';

type Props = {
  type: COMMIT_BUTTON_TYPE;
  disabled?: boolean;
} & DOMAttributes<HTMLButtonElement>;

export const CommitButton: FC<Props> = memo(({ type, disabled, ...props }) => {
  const button = useMemo(() => {
    switch (type) {
      case COMMIT_BUTTON_TYPE.REJECT:
        return { title: 'Reject', icon: RejectIcon };

      case COMMIT_BUTTON_TYPE.CANCEL:
        return { title: 'Cancel', icon: CancelIcon };

      default:
        return { title: 'Approve', icon: ApproveIcon };
    }
  }, [type]);

  return (
    <ButtonWrapper {...props} disabled={disabled} $type={type}>
      <Image src={button.icon} alt={button.title} /> {button.title}
    </ButtonWrapper>
  );
});

CommitButton.displayName = 'CommitButton';
