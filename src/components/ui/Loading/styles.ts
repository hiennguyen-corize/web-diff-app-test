import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const dots = keyframes`
  0% {
    content: "";
  }
  10% {
    content: ".";
  }
  25% {
    content: ".";
  }
  35% {
    content: "..";
  }
  50% {
    content: "..";
  }
  60% {
    content: "...";
  }
  75% {
    content: "...";
  }
  85% {
    content: "";
  }
  100% {
    content: "";
  }
`;

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  35% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  60% {
    transform: rotate(270deg);
  }
  75% {
    transform: rotate(270deg);
  }
  85% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const fadeOut = keyframes`
   0% { opacity: 1; }
  80% { opacity: 0.7; }  
  90% { opacity: 0.6; }  
  100% { opacity: 0; visibility: hidden; }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndex.loading};
  background-color: ${({ theme }) => theme.colors.shade_200};
  animation: ${fadeOut} 1s cubic-bezier(0.4, 0, 1, 1) forwards;
`;

export const LoadingImage = styled(Image)`
  animation: ${rotateIcon} 2.5s linear infinite;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 29.25px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const LoadingText = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  color: ${({ theme }) => theme.colors.primary_700};

  &::after {
    content: 'Loading';
    display: inline-block;
    animation: ${dots} 2.5s cubic-bezier(0.38, 0.85, 0.71, 1) infinite;
  }
`;

export const LoadingComponentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
