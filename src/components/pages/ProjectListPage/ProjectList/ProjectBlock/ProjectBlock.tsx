import useCurrentUser from '@/hooks/user.hook';
import { ProjectsOmitType } from '@/models/GetProjectsType';
import { UseMutateFunction } from '@tanstack/react-query';
import { useTransitionRouter } from 'next-view-transitions';
import { FC, memo, useCallback } from 'react';
import { ActionIcons } from './ActionIcons';
import {
  ProjectTitleWrapper,
  WrapperBlock,
  WrapperDescription,
  WrapperHeader,
} from './styles';

type Props = {
  onDeleteProject: UseMutateFunction<
    void,
    Error,
    {
      deleteProjectId: string;
    },
    unknown
  >;
  project: ProjectsOmitType;
  isDeleting: boolean;
};

export const ProjectBlock: FC<Props> = memo(
  ({ project, onDeleteProject, isDeleting }) => {
    const {
      id: projectId,
      name: projectName,
      userId: projectUserId,
      description: projectDescription,
    } = project;

    const { push } = useTransitionRouter();
    const { user } = useCurrentUser();

    const handleNavigate = useCallback(() => {
      if (isDeleting) {
        return;
      }

      const searchParams = new URLSearchParams();
      searchParams.set('projectId', projectId);
      push(`/project/detail?${searchParams.toString()}`);
    }, [isDeleting, projectId, push]);

    const isOwner = user?.uid === projectUserId;

    return (
      <WrapperBlock $isDeleting={isDeleting} onClick={handleNavigate}>
        <WrapperHeader>
          <ProjectTitleWrapper title={projectName} $isOwner={isOwner}>
            {projectName}
          </ProjectTitleWrapper>
          <ActionIcons
            isOwner={isOwner}
            projectId={projectId}
            projectName={projectName}
            onDeleteProject={onDeleteProject}
            projectDescription={projectDescription}
          />
        </WrapperHeader>
        <WrapperDescription title={projectDescription}>
          {projectDescription}
        </WrapperDescription>
      </WrapperBlock>
    );
  }
);

ProjectBlock.displayName = 'ProjectBlock';
