import { useBooleanState } from '@/hooks/useBooleanState';
import Image from 'next/image';
import { FC } from 'react';
import ShareIcon from './assets/share.svg';
import { ShareModal } from './ShareModal';
import { ShareIconWrapper, ShareWrapper } from './styles';

export const ShareWithOthers: FC = () => {
  const {
    boolean: isModalShow,
    setTrue: openModal,
    setFalse: closeModal,
  } = useBooleanState(false);

  return (
    <ShareWrapper>
      <ShareIconWrapper onClick={openModal}>
        <Image src={ShareIcon} alt='share-icon' width={24} height={24} />
      </ShareIconWrapper>
      <ShareModal isModalShow={isModalShow} closeModal={closeModal} />
    </ShareWrapper>
  );
};
