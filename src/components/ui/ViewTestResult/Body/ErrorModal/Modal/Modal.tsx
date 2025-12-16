import { Button } from '@/components/ui/Button';
import { Modal as DefaultModal } from '@/components/ui/Modal';
import { RunVisualButtonRefType } from '@/components/ui/RunVisualButton';
import { useQueryString } from '@/hooks/useQueryString';
import { BUTTON_TYPE } from '@/types';
import Image from 'next/image';
import { FC, RefObject, useCallback } from 'react';
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
  errorMessages: string[];
  runVisualButtonRef: RefObject<RunVisualButtonRefType | null>;
};

export const Modal: FC<Props> = ({
  open,
  onClose,
  errorMessages,
  runVisualButtonRef,
}) => {
  const { navigate, removeQueryString } = useQueryString();

  const handleTryAgain = useCallback(() => {
    onClose();
    navigate(
      removeQueryString([{ name: 'pageSnapshotId' }, { name: 'commitId' }])
    );
    window.scrollTo(0, 0);
    runVisualButtonRef.current?.runVisualCheck();
  }, [navigate, onClose, removeQueryString, runVisualButtonRef]);

  return (
    <ModalWrapper>
      <DefaultModal isNotGlobalOverflowHidden open={open} onClose={onClose}>
        <ContentWrapper>
          <Title>There is an error</Title>
          <Image src={WarningIcon} alt='warning-icon' />
          <ReasonsWrapper>
            {errorMessages.map((message, index) => (
              <ErrorMessageWrapper key={index}>{message}</ErrorMessageWrapper>
            ))}
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
                title: 'Try again',
              }}
              onClick={handleTryAgain}
            />
          </ButtonsWrapper>
        </ContentWrapper>
      </DefaultModal>
    </ModalWrapper>
  );
};
