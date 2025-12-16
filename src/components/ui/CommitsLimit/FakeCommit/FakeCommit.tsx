import { Commit } from '@/components/pages/ProjectDetailPage/ProjectDetail/Commits/Commit';
import { COMMIT_STATE } from '@/types';
import dayjs from 'dayjs';
import { FilterWrapper } from './styles';

const mockCommit = {
  id: '',
  fail: 0,
  userId: '',
  success: 0,
  dateOrder: 0,
  projectId: '',
  totalPages: 0,
  pageSnapshots: [],
  status: undefined,
  state: COMMIT_STATE.IDLE,
  createdAt: dayjs().toISOString(),
  finishedAt: dayjs().toISOString(),
};

export const FakeCommit = () => {
  return (
    <FilterWrapper>
      <Commit isApprovedCommit={false} commit={mockCommit} />
      <Commit isApprovedCommit={false} commit={mockCommit} />
    </FilterWrapper>
  );
};
