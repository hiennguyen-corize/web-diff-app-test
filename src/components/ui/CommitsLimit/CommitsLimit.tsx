import { FC } from 'react';
import { FakeCommit } from './FakeCommit';
import { CommitLimitWrapper } from './styles';
import { ViewTestHistoryBuy } from './ViewTestHistoryBuy';

type Props = {
  isShow: boolean;
};

export const CommitsLimit: FC<Props> = ({ isShow }) => {
  if (!isShow) {
    return null;
  }

  return (
    <CommitLimitWrapper>
      <ViewTestHistoryBuy />
      <FakeCommit />
    </CommitLimitWrapper>
  );
};
