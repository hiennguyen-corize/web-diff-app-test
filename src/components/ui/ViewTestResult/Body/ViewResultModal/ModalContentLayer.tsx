import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useRef } from 'react';
import { Modal, ModalScrollRef } from './Modal';
import { ModalContentInputDataProps } from './ModalContentInputData';

const ModalContentInputDataDynamic = dynamic<ModalContentInputDataProps>(
  () =>
    import('./ModalContentInputData').then((mod) => mod.ModalContentInputData),
  {
    ssr: false,
    loading: () => (
      <Image
        width={900}
        height={1000}
        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        src={'/images/placeholder-blur.jpg'}
        alt={'Placeholder image'}
      />
    ),
  }
);

type Props = {
  open: boolean;
  onClose: () => void;
  commitPageSnapshot: CommitPageSnapshotType;
};

export const ModalContentLayer: FC<Props> = ({
  open,
  onClose,
  commitPageSnapshot,
}) => {
  const modalScrollRef = useRef<ModalScrollRef>(null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      ref={modalScrollRef}
      comparedImages={commitPageSnapshot.screenshot.comparedImages}
      checksumResult={commitPageSnapshot.checksumComparison?.result}
    >
      <ModalContentInputDataDynamic
        modalScrollRef={modalScrollRef}
        commitPageSnapshot={commitPageSnapshot}
      />
    </Modal>
  );
};
