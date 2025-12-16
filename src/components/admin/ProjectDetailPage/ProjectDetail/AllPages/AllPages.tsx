import { showAllPagesAtom } from '@/components/admin/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { useAtomValue } from 'jotai';
import { FC, memo } from 'react';
import { TabBody } from './TabBody';
import { TableHead } from './TableHead';
import { TableWrapper } from './styles';

/**
 * A functional component that renders a table of all pages in a project if the
 * {@link showAllPagesAtom} is true.
 *
 * @return {JSX.Element} The JSX element representing the table of all pages.
 */
export const AllPages: FC = memo(() => {
  const isShow = useAtomValue(showAllPagesAtom);

  return isShow ? (
    <TableWrapper>
      <TableHead />
      <TabBody />
    </TableWrapper>
  ) : null;
});

AllPages.displayName = 'AllPages';
