import { SKELETON_HEIGHT } from '@/constants/styles';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

export const InputWrapper = styled.div<{ $isError: boolean }>`
  position: relative;
`;

export const InputText = styled.input<{ $isError: boolean; $isShow: boolean }>`
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.false_700 : theme.colors.secondary_270};
  background-color: ${({ theme, $isError }) =>
    $isError && theme.colors.false_250};
  display: ${({ $isShow }) => ($isShow ? 'inline-block' : 'none')};
  transition: all 0.2s ease-out;
  border-radius: 8px;
  padding: 16px 23px;
  width: 100%;
  font-size: 16px;
  line-height: 24px;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.shade_700};
    color: ${({ theme }) => theme.colors.shade_950};
  }
`;

export const ErrorMessage = styled.div<{ $isError: boolean }>`
  display: flex;
  align-items: flex-end;
  font-weight: 400;
  font-size: 16px;
  padding-left: 10px;
  line-height: 24px;
  transition: all 0.2s ease-out;
  color: ${({ theme }) => theme.colors.false_700};
  height: ${({ $isError }) => ($isError ? '28px' : '24px')};
`;

export const Eye = styled(Image)`
  cursor: pointer;
`;

export const EyeWrapper = styled.div`
  position: absolute;
  right: 24px;
  height: 100%;
  top: 0;
  display: flex;
  align-items: center;
`;

export const InputWrap = styled.div`
  position: relative;
  height: fit-content;

  span[aria-live='polite'] {
    height: ${SKELETON_HEIGHT}px;
    position: relative;
    display: block;

    br {
      display: none;
    }
  }
`;

export const CustomSkeleton = styled(Skeleton)`
  height: ${SKELETON_HEIGHT}px;
  position: relative;
  top: -3px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_270};
`;
