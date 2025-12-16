import { showAnimation } from '@/components/pages/Setting/SettingTabs/styles';
import styled, { css } from 'styled-components';

const TextStyles = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.shade_950};
`;

export const SelectTimeWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.shade_950};
  position: relative;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  width: 100%;
  gap: 8px;
`;

export const InputWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export const ImageWrapper = styled.div<{ $isActive: boolean }>`
  transform: ${({ $isActive }) => ($isActive ? 'rotate(180deg)' : 'rotate(0)')};
  user-select: none;
  position: absolute;
  cursor: pointer;
  right: 24px;
`;

export const SelectList = styled.ul`
  position: absolute;
  top: calc(100% + 17px);
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.shade_200};
  border: 1px solid ${({ theme }) => theme.colors.shade_950};
  animation: ${showAnimation} 0.25s ease-in-out forwards;
  overflow: hidden;

  li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.shade_950};
    padding: 16px 24px;
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const SelectItem = styled.li<{ $isActive: boolean }>`
  gap: 8px;
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  color: ${({ theme }) => theme.colors.shade_950};
  transition: background-color 0.2s ease-in-out forwards;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary_700 : theme.colors.shade_200};

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: ${theme.colors.primary_700};
          color: ${theme.colors.shade_200};
          &:hover {
            background-color: ${({ theme }) => theme.colors.primary_750};
          }
        `
      : css`
          background-color: ${theme.colors.shade_200};
          color: ${theme.colors.secondary_700};
          &:hover {
            background-color: ${({ theme }) => theme.colors.shade_270};
          }
        `}
`;

export const NumberInput = styled.input<{ $width?: number }>`
  ${TextStyles}
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  width: ${({ $width }) => ($width ? `${$width}px` : '2ch')};
`;

export const Suffix = styled.span`
  ${TextStyles}
  user-select: none;
`;

export const SelectSuffixWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  flex: 1 1 100%;
`;
