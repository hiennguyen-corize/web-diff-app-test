import styled from 'styled-components';

export const Th = styled.th`
  padding: 16px 54px;
  font-style: normal;
  text-align: left;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_270};
`;

export const Tr = styled.tr`
  th {
    &:first-child {
      width: 30%;
    }
    &:nth-child(2) {
      width: 25%;
    }
    &:last-child {
      width: 15%;
    }
    &:last-child {
      width: 30%;
    }
  }
`;
