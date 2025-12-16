'use client';
import { useNotification } from '@/hooks/useNotification';
import useCurrentUser from '@/hooks/user.hook';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { DataListUser } from '@/models/GetAdminUsers';
import { UpdateUserRequest } from '@/models/users.model';
import {
  deleteUserInfo,
  getUserDetail,
  updateUserInfo,
} from '@/services/admin/users';
import { Cookie, getCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

export const useAdminUsers = (onClose?: () => void) => {
  const { setNotification } = useNotification();
  const updateDataQuery = useUpdateDataQuery();
  const uid = getCookie(Cookie.UUID);
  const { user } = useCurrentUser();

  const deleteQuery = useCallback(
    (userId: string) => {
      updateDataQuery(['/admin/users'], (prev: DataListUser[]) => {
        return prev?.filter((user) => user.userRecord.uid !== userId);
      });
    },
    [updateDataQuery]
  );

  const updateUserState = useCallback(
    (userDataNew: UpdateUserRequest) => {
      updateDataQuery(['/admin/users'], (prev: DataListUser[]) => {
        return prev.map((user) => {
          if (user.userRecord.uid === userDataNew.uid) {
            user.userMeta.rule = userDataNew.rule;
            return user;
          }

          // Nếu không, giữ nguyên user
          return user;
        });
      });
    },
    [updateDataQuery]
  );

  const handleUpdateUsers = async (dataUpdate: UpdateUserRequest) => {
    if (!uid) {
      return;
    }

    try {
      await updateUserInfo(dataUpdate, uid);
      const userInfo = await handleGetDetailUser(uid);
      if (userInfo) {
        updateUserState({ uid: dataUpdate.uid, rule: dataUpdate.rule });
      }

      setNotification({
        type: 'success',
        message: 'Update user success',
      });
      onClose?.();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message ?? 'Some thing error';
        setNotification({ type: 'error', message: errorMessage });
      } else {
        setNotification({ type: 'error', message: 'Some thing error' });
      }

      return [];
    }
  };

  const handleGetDetailUser = async (userId: string) => {
    const usersData = await getUserDetail(userId);
    return usersData.data;
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      if (!user?.uid) {
        return;
      }
      await deleteUserInfo(userId, user.uid);

      deleteQuery(userId);
      setNotification({
        type: 'success',
        message: 'Delete user successfully',
      });
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      setNotification({ type: 'error', message: errorMessage });
      return [];
    }
  };

  const { isPending: isPendingUpdate, mutate: updateUser } = useMutation({
    mutationFn: handleUpdateUsers,
  });

  const { isPending: isPendingDelete, mutate: deleteUser } = useMutation({
    mutationFn: handleDeleteUser,
  });

  return {
    isPendingUpdate,
    updateUser,
    isPendingDelete,
    deleteUser,
  };
};
