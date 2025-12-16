import { AddNewButton } from '@/components/ui/AddNewButton';
import { BackButton } from '@/components/ui/BackButton';
import {
  RunVisualButton,
  RunVisualButtonRefType,
} from '@/components/ui/RunVisualButton';

import { useFirstScreen } from '@/hooks/useFirstScreen';
import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { useTransitionRouter } from 'next-view-transitions';
import { forwardRef, useCallback, useMemo } from 'react';
import { Setting } from './Settings/Setting';
import { ShareWithOthers } from './ShareWithOthers';
import { ShowAllPageButton } from './ShowAllPageButton';
import {
  ActionButtonsWrapper,
  ProjectName,
  ProjectNameWrapper,
  TopTabWrapper,
  TopTapWrapper,
} from './styles';

type Props = {
  projectName?: string;
  projectId?: string;
};

/**
 * The top bar of the project detail page.
 *
 * @param {string} [projectName] The name of the project.
 *
 * @return {JSX.Element} The JSX element representing the top bar.
 */
export const Top = forwardRef<RunVisualButtonRefType, Props>(
  ({ projectName, projectId }, runVisualButtonRef) => {
    if (!projectName || !projectId) {
      return null;
    }

    const { push } = useTransitionRouter();

    const { projectDetailScreenState } = useFirstScreen();

    const back = useCallback(() => {
      push(`/projects`);
    }, [push]);

    const isNotPagesAndCommits = useMemo(
      () =>
        typeof projectDetailScreenState === 'number' &&
        projectDetailScreenState !==
          PROJECT_DETAIL_STATE_TYPE.NOT_PAGES_AND_COMMITS,
      [projectDetailScreenState]
    );

    const isHavePagesButNotCommits = useMemo(
      () =>
        projectDetailScreenState !==
        PROJECT_DETAIL_STATE_TYPE.HAVE_PAGES_BUT_NOT_COMMITS,
      [projectDetailScreenState]
    );

    return (
      <TopTapWrapper>
        <BackButton back={back} />
        <TopTabWrapper>
          <ProjectNameWrapper>
            <ProjectName title={projectName}>{projectName}</ProjectName>
            <ShareWithOthers />
            <Setting projectId={projectId} projectName={projectName} />
          </ProjectNameWrapper>
          {isNotPagesAndCommits && (
            <ActionButtonsWrapper>
              <ShowAllPageButton />
              {isHavePagesButNotCommits && (
                <RunVisualButton ref={runVisualButtonRef} />
              )}
              <AddNewButton />
            </ActionButtonsWrapper>
          )}
        </TopTabWrapper>
      </TopTapWrapper>
    );
  }
);

Top.displayName = 'Top';
