import { getProjectUserIdAndCollaborators } from '@/services/project';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import useCurrentUser from './user.hook';

export const useProjectPermission = () => {
  const [isAllowed, setIsAllowed] = useState<boolean>();
  const [isPermissionChecking, setPermissionChecking] = useState<boolean>();

  const params = useSearchParams();
  const currentUser = useCurrentUser();

  const checkUserPermission = useCallback(async () => {
    const projectId = params.get('projectId');

    if (!projectId) {
      setIsAllowed(false);
      return;
    }

    try {
      setPermissionChecking(true);
      const { userId, collaborators } =
        await getProjectUserIdAndCollaborators(projectId);

      const uid = currentUser?.user?.uid;
      const email = currentUser?.user?.email;

      const allow =
        (!!userId && !!uid && userId === uid) ||
        (!!email && !!collaborators?.includes(email));

      setIsAllowed(allow);
      return allow;
    } catch (error) {
      // do nothing
    } finally {
      setPermissionChecking(false);
    }
  }, [currentUser?.user?.email, currentUser?.user?.uid, params]);

  useEffect(() => {
    checkUserPermission();
  }, [checkUserPermission]);

  return {
    isAllowed,
    isPermissionChecking,
    checkUserPermission,
  };
};
