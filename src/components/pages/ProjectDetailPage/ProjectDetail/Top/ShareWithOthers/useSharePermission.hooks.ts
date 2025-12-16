import useCurrentUser from '@/hooks/user.hook';
import { ProjectType } from '@/models/GetProjectType';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSharePermission = () => {
  const [isSharePermission, setIsSharePermission] = useState(false);

  const { user } = useCurrentUser();

  const params = useSearchParams();
  const projectId = params.get('projectId');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!projectId) {
      return;
    }

    const project = queryClient.getQueryData<ProjectType>([projectId]);

    if (project) {
      setIsSharePermission(project.userId === user?.uid);
    }
  }, [projectId, queryClient, user?.uid]);

  return { isSharePermission, setIsSharePermission };
};
