import { useNotification } from '@/hooks/useNotification';
import useCurrentUser from '@/hooks/user.hook';
import { ProjectType } from '@/models/GetProjectType';
import { USER_PLANS_TYPE } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const DEFAULT_PROJECT_LIMIT = 3;

export const useLimitProjectCreate = () => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const handleCheckCreateProject = useCallback(
    (callback: () => void) => {
      const projects = queryClient.getQueryData<ProjectType[]>(['projects']);

      const canCreate =
        (typeof projects?.length === 'number' &&
          projects.length >= 0 &&
          !!user?.projectLimit &&
          projects.length < user.projectLimit) ||
        (!user?.projectLimit &&
          user?.type === USER_PLANS_TYPE.FREE &&
          typeof projects?.length === 'number' &&
          projects.length >= 0 &&
          projects.length < DEFAULT_PROJECT_LIMIT);

      if (!canCreate) {
        setNotification({
          type: 'error',
          message:
            'Your current plan has reached its project limit. Upgrade now to create more projects.',
        });
        return;
      }

      callback();
    },
    [queryClient, setNotification, user?.projectLimit, user?.type]
  );

  return { handleCheckCreateProject };
};
