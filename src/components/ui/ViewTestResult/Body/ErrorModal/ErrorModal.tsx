import { RunVisualButtonRefType } from '@/components/ui/RunVisualButton';
import { MODAL_ID } from '@/constants/common';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { FC, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from './Modal';
import { useErrorModal } from './useErrorModal.hooks';

type Props = {
  isCancelled: boolean;
  commitPageSnapshots: CommitPageSnapshotType[];
  runVisualButtonRef: RefObject<RunVisualButtonRefType | null>;
};

export const ErrorModal: FC<Props> = ({
  commitPageSnapshots,
  runVisualButtonRef,
  isCancelled,
}) => {
  const { open, hideModal, errorMessages } = useErrorModal(commitPageSnapshots);

  const modalElement = document.getElementById(MODAL_ID);

  if (!modalElement) {
    return null;
  }

  return open && !isCancelled
    ? createPortal(
        <Modal
          open={open}
          onClose={hideModal}
          errorMessages={errorMessages}
          runVisualButtonRef={runVisualButtonRef}
        />,
        modalElement
      )
    : null;
};
