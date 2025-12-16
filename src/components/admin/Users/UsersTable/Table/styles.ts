import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 155px 0;
`;

export const TableWrapper = styled.table`
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;

  & tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  & tbody tr:last-child {
    border-bottom: none;
  }
`;
