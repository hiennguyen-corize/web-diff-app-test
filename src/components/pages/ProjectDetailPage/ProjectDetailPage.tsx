'use client';
import { FC } from 'react';
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
export const ProjectDetailPage: FC = () => {
  const {
    project,
    commits,
    notFound,
    isProjectDetailLoading,
    isBuyMoreStorageShow,
  } = useProjectDetail();

  useCleanProjectDetailState();

  return (
    <ProjectDetailPageWrapper>
      <ApiResultState
        project={project}
        notFound={notFound}
        isLoading={isProjectDetailLoading}
        render={(project) => (
          <ProjectDetail
            isBuyMoreStorageShow={isBuyMoreStorageShow}
            projectName={project.name}
            projectId={project.id}
            commits={commits}
          />
        )}
      />
    </ProjectDetailPageWrapper>
  );
};

ProjectDetailPage.displayName = 'ProjectDetailPage';
