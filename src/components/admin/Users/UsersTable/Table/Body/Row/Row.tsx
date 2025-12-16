import { Modal } from '@/components/admin/Users/UsersTable/Table/Modal/Modal';
import useCurrentUser from '@/hooks/user.hook';
import { useAdminUsers } from '@/hooks/usersAdmin.hook';
import { DataListUser } from '@/models/GetAdminUsers';
import { USER_RULE_TYPE } from '@/types';
import dayjs from 'dayjs';
import { first, last } from 'lodash';
import { Dispatch, FC, memo, SetStateAction, useState } from 'react';
import TrashIcon from './assets/trash.svg';
import {
  ButtonCustom,
  ButtonsWrapper,
  DateWrapper,
  IconWrapper,
  Td,
  Tr,
  UrlWrapper,
} from './styles';

type Props = {
  userData: DataListUser;
  toggleActiveModal: () => void;
  setUserViewDetail: Dispatch<SetStateAction<DataListUser | undefined>>;
};

export const Row: FC<Props> = memo(
  ({ userData, toggleActiveModal, setUserViewDetail }) => {
    const datetime = dayjs(userData.userRecord?.metadata?.creationTime).format(
      'DD/MM/YYYY HH:mm:ss'
    );
    const dateAndTime = datetime.split(' ');
    const [visibleConfirmDeletes, setVisibleConfirmDeletes] = useState<
      Record<string, boolean>
    >({});

    const { isPendingDelete, deleteUser } = useAdminUsers();
    const { user } = useCurrentUser();
    const disableUserUpdate = user?.uid === userData.userRecord.uid;

    const handleViewUserInfo = () => {
      if (disableUserUpdate) {
        return;
      }
      toggleActiveModal();
      setUserViewDetail && setUserViewDetail(userData);
    };

    const handleVisibleConfirm = () => {
      if (disableUserUpdate) {
        return;
      }
      setVisibleConfirmDeletes({ [userData.userRecord.uid]: true });
    };

    const handleDeleteUser = () => {
      deleteUser(userData.userRecord.uid);
    };

    const onCloseModal = () => {
      setVisibleConfirmDeletes({});
    };

    return (
      <Tr disable={disableUserUpdate}>
        <Td>
          <UrlWrapper>{userData.userRecord?.email}</UrlWrapper>
        </Td>
        <Td>
          <UrlWrapper>
            {userData.userMeta?.rule === USER_RULE_TYPE.USER ? 'User' : 'Admin'}
          </UrlWrapper>
        </Td>
        <Td>
          <DateWrapper>
            <span>{first(dateAndTime)}</span>
            <span>{last(dateAndTime)}</span>
          </DateWrapper>
        </Td>
        <Td>
          <ButtonsWrapper>
            <ButtonCustom
              disable={disableUserUpdate}
              onClick={handleViewUserInfo}
            >
              Edit
            </ButtonCustom>
            <IconWrapper
              disable={disableUserUpdate}
              onClick={handleVisibleConfirm}
              src={TrashIcon.src}
            />
          </ButtonsWrapper>
          <Modal
            isPendingDelete={isPendingDelete}
            onDelete={handleDeleteUser}
            open={!!visibleConfirmDeletes[userData.userRecord.uid]}
            onClose={onCloseModal}
          />
        </Td>
      </Tr>
    );
  }
);

Row.displayName = 'Row';
