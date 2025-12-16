'use client';
import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader';

import { UserTable } from '@/components/admin/Users/UsersTable/Table/UserTable';
import { UserHeader } from '@/components/admin/Users/UsersTable/UserHeader';
import { useBooleanState } from '@/hooks/useBooleanState';
import { DataListUser } from '@/models/GetAdminUsers';
import { FC, useState } from 'react';
import { ModalUserInfo } from './ModalUser';

type Props = {
  isUsersLoading: boolean;
  users?: DataListUser[];
};

export const UsersTable: FC<Props> = ({ isUsersLoading, users }) => {
  const [userViewDetail, setUserViewDetail] = useState<DataListUser>();

  const {
    boolean: activeModal,
    toggle: toggleActiveModal,
    setFalse: setCloseModal,
  } = useBooleanState(false);

  if (isUsersLoading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {userViewDetail && (
        <ModalUserInfo
          userView={userViewDetail}
          activeModal={activeModal}
          setCloseModal={setCloseModal}
        />
      )}
      <UserHeader />
      {users && (
        <UserTable
          toggleActiveModal={toggleActiveModal}
          setUserViewDetail={setUserViewDetail}
          users={users}
        />
      )}
    </>
  );
};

UsersTable.displayName = 'UsersTable';
