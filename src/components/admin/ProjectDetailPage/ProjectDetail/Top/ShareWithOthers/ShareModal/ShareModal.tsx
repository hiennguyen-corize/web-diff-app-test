import { PortalModal } from '@/components/ui/PortalModal';
import { SHARE_SCREEN_TYPE } from '@/types';
import { FC, useState } from 'react';
import { ModalContent } from './ModalContent';

type Props = {
  isModalShow: boolean;
  closeModal: () => void;
};

export const ShareModal: FC<Props> = ({ isModalShow, closeModal }) => {
  const [screen, setScreen] = useState<SHARE_SCREEN_TYPE>(
    SHARE_SCREEN_TYPE.FIRST
  );

  return (
    <PortalModal
      open={isModalShow}
      isOverflowHidden
      onClose={() => {
        closeModal();
        setScreen(SHARE_SCREEN_TYPE.FIRST);
      }}
    >
      <ModalContent screen={screen} setScreen={setScreen} />
    </PortalModal>
  );
};
