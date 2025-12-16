import styled from 'styled-components';

export const Td = styled.td`
  padding: 34px 54px;
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
