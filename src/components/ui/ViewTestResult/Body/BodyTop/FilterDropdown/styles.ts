import styled from 'styled-components';

export const LabelWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 4px;
  background: ${({ theme }) => theme.colors.shade_200};
  border: 1px solid ${({ theme }) => theme.colors.shade_950};
  border-radius: 8px;
  height: 40px;
  width: 100%;
  user-select: none;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  width: 133px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_950};
`;

export const ArrowWrapper = styled.div<{ $isActive: boolean }>`
  transition: all 0.2s ease-out;
  transform: rotate(${({ $isActive }) => ($isActive ? -180 : 0)}deg);
`;

export const ItemWrapper = styled(LabelWrapper)`
  justify-content: flex-start;
  border-radius: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.shade_270};
  }
`;

export const DropdownItems = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.shade_200};
  border: 1px solid ${({ theme }) => theme.colors.shade_950};
  z-index: 10;
  border-radius: 8px;
  overflow: hidden;

  ${ItemWrapper} {
    border: none;
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.colors.shade_950};
    }
  }
`;
