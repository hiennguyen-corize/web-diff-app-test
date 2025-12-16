import { showAllPagesAtom } from '@/components/pages/ProjectDetailPage/ProjectDetail/Top/ShowAllPageButton';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { FC, memo } from 'react';
import Skeleton from 'react-loading-skeleton';

const TableDynamic = dynamic(() => import('./Table').then((mod) => mod.Table), {
  ssr: false,
  loading: () => <Skeleton height={60} count={10} />,
});

/**
 * A functional component that renders a table of all pages in a project if the
 * {@link showAllPagesAtom} is true.
 *
 * @return {JSX.Element} The JSX element representing the table of all pages.
 */
export const AllPages: FC = memo(() => {
  const isShow = useAtomValue(showAllPagesAtom);
  return isShow ? <TableDynamic /> : null;
});

AllPages.displayName = 'AllPages';
