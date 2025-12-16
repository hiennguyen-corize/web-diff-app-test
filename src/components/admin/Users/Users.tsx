'use client';
import { useGetAdminUsers } from '@/hooks/admin/useGetAdminUsers.hooks';
import { FC } from 'react';
import { UsersTable } from './UsersTable';

export const Users: FC = () => {
  const { isUsersLoading, users } = useGetAdminUsers();

  return <UsersTable isUsersLoading={isUsersLoading} users={users} />;
};
