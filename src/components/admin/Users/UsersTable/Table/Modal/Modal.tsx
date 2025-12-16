import { Button } from '@/components/ui/Button';
import { Modal as DefaultModal } from '@/components/ui/Modal';
import { BUTTON_TYPE } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import WarningIcon from './assets/warning.svg';
import {
  ButtonsWrapper,
  ContentWrapper,
  ErrorMessageWrapper,
  ModalWrapper,
  ReasonsWrapper,
  Title,
} from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  isPendingDelete: boolean;
};

export const Modal: FC<Props> = ({
  open,
  onClose,
  onDelete,
  isPendingDelete,
}) => {
  return (
    <ModalWrapper>
      <DefaultModal open={open} onClose={onClose}>
        <ContentWrapper>
          <Title>Delete User ? </Title>
          <Image src={WarningIcon} alt='warning-icon' />
          <ReasonsWrapper>
            <ErrorMessageWrapper>
              You will not be able recover it
            </ErrorMessageWrapper>
          </ReasonsWrapper>
          <ButtonsWrapper>
            <Button
              options={{
                type: BUTTON_TYPE.GHOST_DEFAULT_LARGE,
                title: 'Cancel',
              }}
              onClick={onClose}
            />
            <Button
              options={{
                type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
                title: 'Delete',
              }}
              onClick={onDelete}
              disabled={isPendingDelete}
            />
          </ButtonsWrapper>
        </ContentWrapper>
      </DefaultModal>
    </ModalWrapper>
  );
};
