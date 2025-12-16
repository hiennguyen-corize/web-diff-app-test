'use client';
import { FC, memo } from 'react';
import { ApiResultState } from './ApiResultState';
import { ProjectDetail } from './ProjectDetail';
import { useProjectDetail } from './projectDetail.hooks';
import { ProjectDetailPageWrapper } from './styles';
import { useCleanProjectDetailState } from './useCleanProjectDetailState.hooks';

/**
 * A functional component that renders the project detail page.
 *
 * @return {JSX.Element} The JSX element representing the project detail page.
 */
export const ProjectDetailPage: FC = memo(() => {
  const { project, commits, isProjectDetailLoading } = useProjectDetail();

  useCleanProjectDetailState();

  return (
    <ProjectDetailPageWrapper>
      <ApiResultState
        project={project}
        isLoading={isProjectDetailLoading}
        render={(project) => (
          <ProjectDetail projectName={project.name} commits={commits} />
        )}
      />
    </ProjectDetailPageWrapper>
  );
});

ProjectDetailPage.displayName = 'ProjectDetailPage';
