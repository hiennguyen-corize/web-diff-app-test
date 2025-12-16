import { MODAL_ID } from '@/constants/common';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer } from './ModalContainer';
import { useCommitPageSnapshot } from './useCommitPageSnapshot.hooks';

export type ViewResultModalProps = {
  open: boolean;
  onClose: () => void;
  commitPageSnapshots: CommitPageSnapshotType[];
};

export const ViewResultModal: FC<ViewResultModalProps> = ({
  open,
  onClose,
  commitPageSnapshots,
}) => {
  const { commitPageSnapshot } = useCommitPageSnapshot(commitPageSnapshots);

  const modalRoot = document.getElementById(MODAL_ID);

  if (!modalRoot || !commitPageSnapshot) {
    return null;
  }

  return open
    ? createPortal(
        <ModalContainer
          open={open}
          onClose={onClose}
          commitPageSnapshot={commitPageSnapshot}
        />,
        modalRoot
      )
    : null;
};
