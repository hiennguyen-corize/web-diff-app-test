import { ProjectsOmitType } from '@/models/GetProjectsType';
import { UseMutateFunction } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
};

export const ProjectBlock: FC<Props> = memo(({ project, onDeleteProject }) => {
  const {
    id: projectId,
    name: projectName,
    description: projectDescription,
  } = project;

  const { push } = useRouter();

  const handleNavigate = useCallback(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('projectId', projectId);
    push(`/admin/projects/detail?${searchParams.toString()}`);
  }, [projectId, push]);

  return (
    <WrapperBlock onClick={handleNavigate}>
      <WrapperHeader>
        <ProjectTitleWrapper>{projectName}</ProjectTitleWrapper>
        <ActionIcons
          projectId={projectId}
          projectName={projectName}
          onDeleteProject={onDeleteProject}
          projectDescription={projectDescription}
        />
      </WrapperHeader>
      <WrapperDescription>{projectDescription}</WrapperDescription>
    </WrapperBlock>
  );
});

ProjectBlock.displayName = 'ProjectBlock';
