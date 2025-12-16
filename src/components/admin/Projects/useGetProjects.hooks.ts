import { useNotification } from '@/hooks/useNotification';
import { getProjects } from '@/services/admin/projects';
import { checkIsAdmin } from '@/services/user';

import { Cookie, getCookie } from '@/utils/cookie';
import { useQuery } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { useCallback } from 'react';

export const useGetProjects = () => {
  const { setNotification } = useNotification();

  const getProjectsList = useCallback(async () => {
    const uuid = getCookie(Cookie.UUID);
    if (!uuid) {
      return;
    }

    const isAdmin = await checkIsAdmin(uuid);

    if (!isAdmin) {
      return;
    }

    try {
      const response = await getProjects();
      return response.data;
    } catch (error) {
      if (error instanceof FirebaseError) {
        setNotification({
          type: 'error',
          message: error.message ?? '',
        });
      }
    }
  }, [setNotification]);

  const {
    isFetching: isProjectsLoading,
    isError: isProjectsError,
    data: projects,
  } = useQuery({
    queryKey: ['/admin/projects'],
    queryFn: getProjectsList,
    refetchOnWindowFocus: false,
  });

  return {
    projects,
    isProjectsError,
    isProjectsLoading,
  };
};
