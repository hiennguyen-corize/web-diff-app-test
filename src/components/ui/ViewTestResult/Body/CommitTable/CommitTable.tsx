import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { FC } from 'react';
import { Body } from './Body';
import { Head } from './Head';
import { TableWrapper } from './styles';

type Props = {
  commitId: string;
  pageSnapshots: CommitPageSnapshotType[];
};

/**
 * Renders a table component for displaying commit page snapshots.
 *
 * @param {CommitPageSnapshotType[]} pageSnapshots - The list of commit page snapshots to display.
 * @param {string} commitId - The ID of the commit.
 * @return {JSX.Element} A table element containing the commit page snapshots.
 */
export const CommitTable: FC<Props> = ({ pageSnapshots, commitId }) => {
  return (
    <TableWrapper>
      <Head />
      <Body commitId={commitId} pageSnapshots={pageSnapshots} />
    </TableWrapper>
  );
};
