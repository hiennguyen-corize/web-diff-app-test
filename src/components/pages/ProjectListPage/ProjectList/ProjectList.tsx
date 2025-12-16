import { ProjectsOmitType } from '@/models/GetProjectsType';
import { UseMutateFunction } from '@tanstack/react-query';
import { FC } from 'react';
import { ProjectBlock } from './ProjectBlock';
import { WrapperProject } from './styles';

export type ProjectListProps = {
  onDeleteProject: UseMutateFunction<
    void,
    Error,
    {
      deleteProjectId: string;
    },
    unknown
  >;
  projects: ProjectsOmitType[] | undefined;
  deletingItemIdList: string[];
};

export const ProjectList: FC<ProjectListProps> = ({
  deletingItemIdList,
  onDeleteProject,
  projects,
}) => {
  return (
    <WrapperProject>
      {projects?.map((project) => (
        <ProjectBlock
          isDeleting={deletingItemIdList.includes(project.id)}
          onDeleteProject={onDeleteProject}
          project={project}
          key={project.id}
        />
      ))}
    </WrapperProject>
  );
};
