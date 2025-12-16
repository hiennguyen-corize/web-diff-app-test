import { ModalScrollRef } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { FC, RefObject } from 'react';
import { ModalContentView } from './ModalContentView';
import { useModalContentInputData } from './useModalContentInputData.hooks';

export type ModalContentInputDataProps = {
  modalScrollRef: RefObject<ModalScrollRef | null>;
  commitPageSnapshot: CommitPageSnapshotType;
};

export const ModalContentInputData: FC<ModalContentInputDataProps> = ({
  commitPageSnapshot,
  modalScrollRef,
}) => {
  const { compareInputData } = useModalContentInputData(commitPageSnapshot);

  return (
    <ModalContentView
      compareInputData={compareInputData}
      modalScrollRef={modalScrollRef}
    />
  );
};
