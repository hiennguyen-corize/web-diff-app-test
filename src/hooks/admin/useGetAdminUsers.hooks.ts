import { useNotification } from '@/hooks/useNotification';
import { listAllUser } from '@/services/admin/users';
import { checkIsAdmin } from '@/services/user';
import { Cookie, getCookie } from '@/utils/cookie';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetAdminUsers = () => {
  const { setNotification } = useNotification();

  const uid = getCookie(Cookie.UUID);

  const handleGetUsers = async (signal: AbortSignal) => {
    if (!uid) {
      return;
    }

    const isAdmin = await checkIsAdmin(uid);

    if (!isAdmin) {
      return;
    }

    try {
      const usersData = await listAllUser(uid, signal);
      return usersData.data ?? [];
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : 'Something error';

      setNotification({ type: 'error', message: errorMessage });
    }
  };

  const { isLoading: isUsersLoading, data: users } = useQuery({
    refetchOnMount: false,
    queryFn: ({ signal }) => handleGetUsers(signal),
    queryKey: ['/admin/users'],
    enabled: !!uid,
  });

  return { isUsersLoading, users };
};
