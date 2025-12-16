import styled, { css } from 'styled-components';

export const Td = styled.td`
  padding: 16px 54px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const DateWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export const Tr = styled.tr<{
  $canClick: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.shade_200};

  ${({ $canClick }) =>
    $canClick &&
    css`
      cursor: pointer;
      &:hover {
        filter: brightness(0.98);
      }
    `}
`;

export const UrlWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
`;
