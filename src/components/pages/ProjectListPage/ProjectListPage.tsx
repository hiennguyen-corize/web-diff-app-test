'use client';
import { FC, memo } from 'react';

import dynamic from 'next/dynamic';
import { ProjectHeader } from './ProjectHeader';
import { ProjectListProps } from './ProjectList';
import { Container } from './styles';
import { useDeleteProjects } from './useDeleteProjects.hooks';
import { useGetProjects } from './useGetProjects.hooks';

const ProjectListDynamic = dynamic<ProjectListProps>(
  () => import('./ProjectList').then((mod) => mod.ProjectList),
  { ssr: false }
);

export const ProjectListPage: FC = memo(() => {
  const { projects } = useGetProjects();

  const { onDeleteProject, deletingItemIdList } = useDeleteProjects();

  return (
    <Container>
      <ProjectHeader />
      {projects ? (
        <ProjectListDynamic
          onDeleteProject={onDeleteProject}
          deletingItemIdList={deletingItemIdList}
          projects={projects}
        />
      ) : null}
    </Container>
  );
});

ProjectListPage.displayName = 'ProjectListPage';
