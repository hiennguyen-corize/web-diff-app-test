import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  tr:last-child {
    th,
    td {
      padding: 0;
    }
  }
`;

export const PlanNameWrapper = styled.div`
  text-transform: capitalize;
`;

export const Th = styled.th`
  white-space: nowrap;
  vertical-align: top;
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 23px;
`;

export const Td = styled.td`
  text-align: right;
  font-style: normal;
  width: 55%;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 23px;
`;

export const ReferenceText = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
