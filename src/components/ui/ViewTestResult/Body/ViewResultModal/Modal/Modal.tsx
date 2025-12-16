import { currentDeviceAtom } from '@/components/ui/ViewTestResult/Body';
import { isFirstScreenshotAtom } from '@/components/ui/ViewTestResult/Body/ViewResultModal/ModalContentInputData/ModalContentView';
import {
  ChecksumResultType,
  PageSnapComparedImagesType,
} from '@/models/GetCommitsType';
import { useAtomValue } from 'jotai';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { BottomModal } from './BottomModal';
import { Container, ModalContainer, ModalWrapper } from './styles';
import { TopModalWrapper } from './TopModalWrapper';
import { useModalEvent } from './useModalEvent.hooks';

type Props = {
  open: boolean;
  onClose: () => void;
  widthModal?: string;
  children: React.ReactNode;
  isAllowClickOutsideToClose?: boolean;
  comparedImages: PageSnapComparedImagesType;
  checksumResult?: ChecksumResultType;
};

export type ModalScrollRef = {
  allowScroll: () => void;
  denyScroll: () => void;
};

export const Modal = memo(
  forwardRef<ModalScrollRef, Props>(
    (
      { open, onClose, children, widthModal, comparedImages, checksumResult },
      modalScrollRef
    ) => {
      const contentRef = useRef<HTMLDivElement>(null);
      const deviceSelectRef = useRef<HTMLDivElement>(null);
      const overlayRef = useRef<HTMLDivElement>(null);
      const modeRef = useRef<HTMLDivElement>(null);
      const matchedSectionRef = useRef<HTMLDivElement>(null);

      const currentDevice = useAtomValue(currentDeviceAtom);
      const isFirstScreenshot = useAtomValue(isFirstScreenshotAtom);

      useModalEvent(
        [contentRef, deviceSelectRef, overlayRef, modeRef, matchedSectionRef],
        onClose,
        open
      );

      if (!open) {
        return null;
      }

      useImperativeHandle(
        modalScrollRef,
        () => ({
          allowScroll() {
            if (contentRef.current) {
              contentRef.current.style.overflowY = 'auto';
            }
          },
          denyScroll() {
            if (contentRef.current) {
              contentRef.current.style.overflowY = 'hidden';
            }
          },
        }),
        []
      );

      return (
        <ModalWrapper $isOpen={open}>
          <Container $isOpen={open}>
            <TopModalWrapper
              ref={deviceSelectRef}
              modeRef={modeRef}
              overlayRef={overlayRef}
              isFirstScreenshot={isFirstScreenshot}
            />
            <ModalContainer
              currentDevice={currentDevice}
              ref={contentRef}
              width={widthModal}
            >
              {children}
            </ModalContainer>
            {!isFirstScreenshot && (
              <BottomModal
                comparedImages={comparedImages}
                currentDevice={currentDevice}
                checksumResult={checksumResult}
                ref={matchedSectionRef}
              />
            )}
          </Container>
        </ModalWrapper>
      );
    }
  )
);

Modal.displayName = 'Modal';
