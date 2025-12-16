'use client';
import { Modal, ModalProps } from '@/components/ui/Modal';
import { MODAL_ID } from '@/constants/common';
import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { PortalModalContainer } from './styles';

export const PortalModal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  open,
  onClose,
  ...props
}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const modalRoot = document.getElementById(MODAL_ID);

  if (!modalRoot) {
    return <></>;
  }

  return createPortal(
    open ? (
      <PortalModalContainer>
        <Modal open={open} onClose={onClose} {...props}>
          {children}
        </Modal>
      </PortalModalContainer>
    ) : null,
    modalRoot
  );
};
