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
  commits?: CommitType[];
};

/**
 * A React functional component for rendering the project detail page.
 *
 * @param {{ projectName?: string, commits?: CommitType[] }} props The component props.
 * @param {string} [props.projectName] The name of the project.
 * @param {CommitType[]} [props.commits] The array of commits.
 *
 * @returns {JSX.Element} A JSX element representing the project detail page.
 */
export const ProjectDetail: FC<Props> = memo(({ projectName, commits }) => {
  const runVisualButtonRef = useRef<RunVisualButtonRefType>(null);

  return (
    <>
      <ViewTestResultContainer
        commits={commits}
        runVisualButtonRef={runVisualButtonRef}
      />
      <Top projectName={projectName} ref={runVisualButtonRef} />
      <AllPages />
      <Commits commits={commits} />
      <FirstScreen />
    </>
  );
});

ProjectDetail.displayName = 'ProjectDetail';
