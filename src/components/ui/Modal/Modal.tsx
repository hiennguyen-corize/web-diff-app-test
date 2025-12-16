import { useClickOutside } from '@/utils/clickOutside';
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CloseImage from './assets/close.svg';
import {
  ChildrenWrapper,
  CloseIcon,
  CommonModalWrapper,
  ModalContainer,
  ModalTitle,
  ModalWrapper,
  SubTitle,
} from './styles';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  $isModalNotAlignCenter?: boolean;
  subTitle?: string;
  widthModal?: string;
  isOverflowHidden?: boolean;
  isNotGlobalOverflowHidden?: boolean;
  isAllowClickOutsideToClose?: boolean;
};

const handleHeightStringToNumber = (height: string) =>
  Number(height.replace('px', ''));

// Modal components
export const Modal: FC<ModalProps> = memo(
  ({
    open,
    onClose,
    children,
    title,
    subTitle,
    widthModal,
    isOverflowHidden,
    $isModalNotAlignCenter,
    isNotGlobalOverflowHidden,
    isAllowClickOutsideToClose = true,
  }) => {
    const ref = useRef(null);

    const [headerHeight, setHeaderHeight] = useState<number>(0);

    useClickOutside(ref, () => isAllowClickOutsideToClose && onClose());

    const handleKeyDown = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onClose();
        }
      },
      [onClose, open]
    );

    const handleMeasureRef = (node: HTMLDivElement | null) => {
      if (!node) {
        return;
      }

      const { height } = getComputedStyle(node);
      setHeaderHeight(handleHeightStringToNumber(height));
    };

    useEffect(() => {
      if (isNotGlobalOverflowHidden) {
        return;
      }

      document.body.style.overflow = open ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isNotGlobalOverflowHidden, open]);

    useEffect(() => {
      document.addEventListener('keydown', (event) => handleKeyDown(event));
      return document.removeEventListener('keydown', (event) =>
        handleKeyDown(event)
      );
    }, [handleKeyDown]);

    return open ? (
      <ModalWrapper
        $isOpen={open}
        $isModalNotAlignCenter={$isModalNotAlignCenter}
      >
        <ModalContainer
          ref={ref}
          $isOpen={open}
          width={widthModal}
          $isOverflowHidden={isOverflowHidden}
        >
          {title && (
            <CommonModalWrapper>
              <ModalTitle ref={handleMeasureRef}>{title}</ModalTitle>
              {subTitle && <SubTitle>{subTitle}</SubTitle>}
              <CloseIcon onClick={onClose} src={CloseImage.src} />
            </CommonModalWrapper>
          )}

          <ChildrenWrapper
            $isOverflowHidden={isOverflowHidden}
            $headerHeight={headerHeight}
          >
            {children}
          </ChildrenWrapper>
        </ModalContainer>
      </ModalWrapper>
    ) : null;
  }
);

Modal.displayName = 'Modal';
