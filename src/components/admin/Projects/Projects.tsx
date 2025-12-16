import { ProjectHeader } from '@/components/admin/Projects/ProjectHeader';
import { ProjectList } from '@/components/admin/Projects/ProjectList';
import { useGetProjects } from '@/components/admin/Projects/useGetProjects.hooks';
import { Container } from '@/components/pages/ProjectListPage/styles';
import { useDeleteProjects } from '@/components/pages/ProjectListPage/useDeleteProjects.hooks';
import { FC } from 'react';

export const Projects: FC = () => {
  const { projects } = useGetProjects();

  const { onDeleteProject } = useDeleteProjects();

  return (
    <Container>
      <ProjectHeader />
      <ProjectList onDeleteProject={onDeleteProject} projects={projects} />
    </Container>
  );
};
