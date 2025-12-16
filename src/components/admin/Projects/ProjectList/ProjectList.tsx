import { ProjectsOmitType } from '@/models/GetProjectsType';
import { UseMutateFunction } from '@tanstack/react-query';
import { FC } from 'react';
import { ProjectBlock } from './ProjectBlock';
import { WrapperProject } from './styles';

type ProjectListProps = {
  onDeleteProject: UseMutateFunction<
    void,
    Error,
    {
      deleteProjectId: string;
    },
    unknown
  >;
  projects: ProjectsOmitType[] | undefined;
};

export const ProjectList: FC<ProjectListProps> = ({
  onDeleteProject,
  projects,
}) => {
  return (
    <WrapperProject>
      {projects?.map((project) => (
        <ProjectBlock
          onDeleteProject={onDeleteProject}
          project={project}
          key={project.id}
        />
      ))}
    </WrapperProject>
  );
};
