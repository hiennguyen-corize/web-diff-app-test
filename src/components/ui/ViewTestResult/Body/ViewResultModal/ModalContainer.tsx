import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { FC } from 'react';
import { PrefetchImagesLayer } from './PrefetchImagesLayer';

type Props = {
  open: boolean;
  onClose: () => void;
  commitPageSnapshot: CommitPageSnapshotType;
};

export const ModalContainer: FC<Props> = ({
  open,
  onClose,
  commitPageSnapshot,
}) => {
  return (
    <PrefetchImagesLayer
      open={open}
      onClose={onClose}
      commitPageSnapshot={commitPageSnapshot}
    />
  );
};
