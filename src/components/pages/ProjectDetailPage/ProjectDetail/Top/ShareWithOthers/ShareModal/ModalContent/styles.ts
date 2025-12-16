import { SHARE_SCREEN_TYPE } from '@/types';
import styled from 'styled-components';
import ArrowIcon from './assets/arrow.svg';

export const ModalHeader = styled.div<{ left: number; right: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: ${({ right }) => right}%;
  left: ${({ left }) => left}%;
  gap: 32px;
`;

export const Title = styled.h3<{ $isCursorPointer?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $isCursorPointer }) =>
    $isCursorPointer ? 'pointer' : 'default'};
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const CopyLinkWrapper = styled.div`
  gap: 8px;
  display: flex;
  cursor: pointer;
  align-items: center;
`;

export const CopyTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const Wrapper = styled.div<{ $screen: SHARE_SCREEN_TYPE }>`
  display: flex;
  width: 678px;
  height: ${({ $screen }) =>
    $screen === SHARE_SCREEN_TYPE.FIRST ? '218px' : '576px'};
  position: relative;
  overflow: hidden;
  transition: all 0.6s;
`;

export const ScreenWrapper = styled.div<{
  $screen: SHARE_SCREEN_TYPE;
}>`
  transform: ${({ $screen }) =>
    `translateX(${$screen === SHARE_SCREEN_TYPE.FIRST ? 0 : '-50%'})`};
  transition: all 0.3s ease-in;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: calc(678px * 2);
`;

export const Screen = styled.div`
  width: 678px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 45px;
`;

export const MemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
  height: 470px;
  overflow: auto;
`;

export const CanAccessControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AccessTitle = styled.h3`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.shade_950};
`;

export const MemberListWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 8px 0;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.shade_270};
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 100%;
    background: url(${ArrowIcon.src}) no-repeat center center;
  }
`;
