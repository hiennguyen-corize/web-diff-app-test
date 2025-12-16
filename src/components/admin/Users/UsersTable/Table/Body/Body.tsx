import { Dispatch, FC, SetStateAction } from 'react';
import { Row } from './Row';
import { DataListUser } from '@/models/GetAdminUsers';

type Props = {
  users: DataListUser[];
  toggleActiveModal: () => void;
  setUserViewDetail: Dispatch<SetStateAction<DataListUser | undefined>>;
};

export const Body: FC<Props> = ({
  users,
  toggleActiveModal,
  setUserViewDetail,
}) => {
  return (
    <tbody>
      {users.map((user, index) => (
        <Row
          toggleActiveModal={toggleActiveModal}
          setUserViewDetail={setUserViewDetail}
          key={index}
          userData={user}
        />
      ))}
    </tbody>
  );
};
