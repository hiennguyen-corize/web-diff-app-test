import styled from 'styled-components';

export const Tr = styled.tr`
  th {
    &:first-child {
      width: 60%;
      padding-left: 54px;
    }
    &:nth-child(2) {
      width: 30%;
    }
    &:last-child {
      width: 10%;
      padding-right: 54px;
    }
  }
`;

export const Th = styled.th`
  text-align: left;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  padding: 16px 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_270};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_270};
`;
