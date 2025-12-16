import { Dispatch, FC, SetStateAction } from 'react';
import { Body } from './Body';
import { Head } from './Head';
import { TableWrapper, Wrapper } from './styles';
import { DataListUser } from '@/models/GetAdminUsers';

type Props = {
  users: DataListUser[];
  toggleActiveModal: () => void;
  setUserViewDetail: Dispatch<SetStateAction<DataListUser | undefined>>;
};

export const UserTable: FC<Props> = ({
  users,
  toggleActiveModal,
  setUserViewDetail,
}) => {
  return (
    <Wrapper>
      <TableWrapper>
        <Head />
        <Body
          users={users}
          toggleActiveModal={toggleActiveModal}
          setUserViewDetail={setUserViewDetail}
        />
      </TableWrapper>
    </Wrapper>
  );
};
