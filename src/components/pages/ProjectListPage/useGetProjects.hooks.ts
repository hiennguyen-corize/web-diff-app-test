import { useNotification } from '@/hooks/useNotification';
import useCurrentUser from '@/hooks/user.hook';
import { getProjects } from '@/services/project';
import { Cookie, getCookie } from '@/utils/cookie';
import { useQuery } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { useCallback } from 'react';

export const useGetProjects = () => {
  const { setNotification } = useNotification();

  const { user } = useCurrentUser();

  const getProjectsList = useCallback(async () => {
    const uuid = getCookie(Cookie.UUID);
    if (!uuid || !user?.email) {
      return;
    }

    const params = {
      userId: uuid,
      email: user.email,
    };

    try {
      const response = await getProjects(params);
      return response.data;
    } catch (error) {
      if (error instanceof FirebaseError) {
        setNotification({
          type: 'error',
          message: error.message ?? '',
        });
      }
    }
  }, [setNotification, user?.email]);

  const { isFetching: isProjectsLoading, data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectsList,
    refetchOnWindowFocus: false,
    enabled: !!user?.email,
  });

  return {
    projects,
    isProjectsLoading,
  };
};
