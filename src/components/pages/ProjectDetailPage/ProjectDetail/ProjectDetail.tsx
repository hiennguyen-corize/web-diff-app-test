import { CommitsLimit } from '@/components/ui/CommitsLimit';
import { RunVisualButtonRefType } from '@/components/ui/RunVisualButton';
import { ViewTestResultContainer } from '@/components/ui/ViewTestResult';
import { CommitType } from '@/models/GetCommitsType';
import { FC, memo, useRef } from 'react';
import { AllPages } from './AllPages';
import { Commits } from './Commits';
import { FirstScreen } from './FirstScreen';
import { Top } from './Top';

type Props = {
  projectName?: string;
  projectId?: string;
  commits?: CommitType[];
  isBuyMoreStorageShow: boolean;
};

export const ProjectDetail: FC<Props> = memo(
  ({ projectName, projectId, commits, isBuyMoreStorageShow }) => {
    const runVisualButtonRef = useRef<RunVisualButtonRefType>(null);

    return (
      <>
        <ViewTestResultContainer
          commits={commits}
          runVisualButtonRef={runVisualButtonRef}
        />
        <Top
          projectName={projectName}
          projectId={projectId}
          ref={runVisualButtonRef}
        />
        <AllPages />
        <Commits commits={commits} />
        <FirstScreen />
        <CommitsLimit isShow={isBuyMoreStorageShow} />
      </>
    );
  }
);

ProjectDetail.displayName = 'ProjectDetail';
