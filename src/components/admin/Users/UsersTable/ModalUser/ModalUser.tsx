import { PortalModal } from '@/components/ui/PortalModal';
import { DataListUser } from '@/models/GetAdminUsers';
import { FC } from 'react';
import { ModalContent } from './ModalContent';
import { WrapperModel } from './styles';

type Props = {
  userView: DataListUser;
  activeModal: boolean;
  setCloseModal: () => void;
};

export const ModalUserInfo: FC<Props> = ({
  userView,
  activeModal,
  setCloseModal,
}) => {
  return (
    <WrapperModel>
      <PortalModal
        open={activeModal}
        onClose={setCloseModal}
        title='Edit user information'
        subTitle='Our support team will get back to you ASAP via email'
      >
        <ModalContent onClose={setCloseModal} userView={userView} />
      </PortalModal>
    </WrapperModel>
  );
};
