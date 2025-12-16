import { PortalModal } from '@/components/ui/PortalModal';
import { MODAL_WIDTH } from '@/constants/common';
import { useSetAtom } from 'jotai';
import { FC, useCallback } from 'react';
import { CustomerModalContainer } from './style';
import { Tabs } from './Tabs';
import { activeAddPageSnapTab, defaultTab } from './Tabs/TabButtons';
import { uploadUrlList } from './Tabs/TabContent/AddUrlByCsv';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddNewPageSnapModal: FC<Props> = ({ open, onClose }) => {
  const setUploadUrls = useSetAtom(uploadUrlList);
  const setActiveTab = useSetAtom(activeAddPageSnapTab);

  const handleCloseModal = useCallback(() => {
    onClose();
    setUploadUrls([]);
    setActiveTab(defaultTab);
  }, [onClose, setActiveTab, setUploadUrls]);

  return (
    <CustomerModalContainer>
      <PortalModal
        open={open}
        onClose={handleCloseModal}
        widthModal={`${MODAL_WIDTH}px`}
      >
        <Tabs onClose={handleCloseModal} />
      </PortalModal>
    </CustomerModalContainer>
  );
};

AddNewPageSnapModal.displayName = 'AddNewPageSnapModal';
