import { FC } from 'react';
import { TableWrapper } from './styles';
import { TabBody } from './TabBody';
import { TableHead } from './TableHead';

export const Table: FC = () => {
  return (
    <TableWrapper>
      <TableHead />
      <TabBody />
    </TableWrapper>
  );
};
