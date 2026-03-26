import { ProjectHeader } from '@/components/admin/Projects/ProjectHeader';
import { ProjectList } from '@/components/admin/Projects/ProjectList';
import { useGetProjects } from '@/components/admin/Projects/useGetProjects.hooks';
import { Container } from '@/components/pages/ProjectListPage/styles';
import { useDeleteProjects } from '@/components/pages/ProjectListPage/useDeleteProjects.hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { FC, useState } from 'react';

export const Projects: FC = () => {
  const { projects } = useGetProjects();
  const { onDeleteProject } = useDeleteProjects();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <Container>
      <ProjectHeader />
      <input
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '14px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          outline: 'none',
          marginBottom: '8px',
        }}
      />
      <ProjectList onDeleteProject={onDeleteProject} projects={filteredProjects} />
    </Container>
  );
};
