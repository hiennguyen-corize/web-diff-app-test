import { MODAL_ANIMATION_DURATION } from '@/constants/modal';
import { DEVICE_TYPE } from '@/types';
import { MEDIA_QUERY } from '@/utils/screenSize';
import styled, { css } from 'styled-components';

export const scrollTrack = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary_700};
    border-radius: 10px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary_250};
  }

  @media (max-width: ${MEDIA_QUERY.TABLET}) {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.secondary_700};
      border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.secondary_250};
    }
  }
`;

export const ModalWrapper = styled.div<{
  $isModalNotAlignCenter?: boolean;
  $isOpen?: boolean;
}>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  color: ${({ theme }) => theme.colors.secondary_900};
  background-color: ${({ theme }) => theme.colors.overlay};

  ${({ $isOpen }) => {
    if ($isOpen) {
      return overlayAnimation;
    }
  }};
`;

export const Container = styled.div<{
  $isOpen?: boolean;
}>`
  min-height: 90%;
  max-height: 90%;
  min-width: 90%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  opacity: 0;
  transform: translateY(10px);

  ${({ $isOpen }) => {
    if ($isOpen) {
      return openAnimation;
    }
  }};
`;

export const ModalContainer = styled.div<{
  width?: string;
  currentDevice: number;
}>`
  flex: 1 1 auto;
  position: relative;
  background: ${({ theme }) => theme.colors.shade_200};
  border-radius: 8px;
  transition: all ${MODAL_ANIMATION_DURATION}s ease-out;
  overflow-y: hidden;
  min-height: calc(100% - 50px - 80px - 24px);
  max-height: calc(100% - 50px - 80px - 24px);

  ${({ currentDevice }) => {
    switch (currentDevice) {
      case DEVICE_TYPE.TABLET:
        return css`
          min-width: 60%;
          max-width: 60%;
        `;

      case DEVICE_TYPE.MOBILE:
        return css`
          min-width: 40%;
          max-width: 40%;
        `;

      default:
        return css`
          min-width: 90%;
          max-width: 90%;
        `;
    }
  }};
`;

const openAnimation = css`
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity ${MODAL_ANIMATION_DURATION}s ease-out,
    transform ${MODAL_ANIMATION_DURATION}s ease-out;
`;

const overlayAnimation = css`
  opacity: 1;
  backdrop-filter: blur(4px);
  transition:
    opacity ${MODAL_ANIMATION_DURATION}s ease-out,
    backdrop-filter ${MODAL_ANIMATION_DURATION}s ease-out;
`;
