import styled from 'styled-components';

export const UrlItem = styled.li`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const UrlItemInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UrlIcon = styled.svg<{ isApproved: boolean; isAllow: boolean }>`
  color: ${({ isApproved, isAllow, theme }) =>
    isApproved && isAllow ? theme.colors.true_700 : theme.colors.secondary_700};
  margin-right: 8px;
  height: 15px;
  width: 15px;
  flex-shrink: 0;
`;

export const UrlText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
