import styled from 'styled-components';

export const Tr = styled.tr`
  &:last-child td {
    border-bottom: none;
  }

  td:first-child {
    padding-left: 54px;
  }

  td:last-child {
    padding-right: 54px;
  }
`;

export const Td = styled.td`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding: 16px 24px;
  color: ${({ theme }) => theme.colors.secondary_700};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_270};
`;

export const Button = styled.button`
  &:disabled {
    filter: invert(67%) sepia(14%) saturate(0%) hue-rotate(181deg)
      brightness(94%) contrast(85%);
  }
`;

export const UrlWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
`;
