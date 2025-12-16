import styled, { keyframes } from 'styled-components';

const animatePulse = keyframes`
  50% {
    opacity: 0.6;
  }
`;

export const SkeletonLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.secondary_200};
  animation: ${animatePulse} 2s infinite;

  > * + * {
    border-top: 1px solid ${({ theme }) => theme.colors.secondary_200};
  }
`;

export const SkeletonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;

  :first-child {
    padding-top: 0;
  }
`;

export const SkeletonTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SkeletonText = styled.div<{
  $width: string;
  $height: string;
  $backgroundColor: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: calc(infinity * 1px);
`;
