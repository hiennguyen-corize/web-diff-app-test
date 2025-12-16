import styled from 'styled-components';

export const ColumnCustom = styled.th<{ width: string }>`
  width: ${({ width }) => (width ? width : 'auto')};
  padding: 20px 0px;
`;

export const TableCustom = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const WrapperHeaderTable = styled.tr`
  text-align: left;
  border-bottom: 1px solid #929292;
`;

export const WrapperTable = styled.div`
  box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
`;
