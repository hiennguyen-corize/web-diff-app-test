import { Button } from '@/components/ui/Button';
import { useAdminUsers } from '@/hooks/usersAdmin.hook';
import { DataListUser } from '@/models/GetAdminUsers';
import { UpdateUserRequest } from '@/models/users.model';
import { BUTTON_TYPE, USER_RULE_TYPE } from '@/types';
import { ChangeEvent, FC, useState } from 'react';
import {
  ButtonGroup,
  FormEditUser,
  GroupInput,
  Label,
  NameInput,
  OptionCustom,
  SelectCustom,
  SelectWrapper,
} from './styles';

type Props = {
  userView: DataListUser;
  onClose: () => void;
};

export const ModalContent: FC<Props> = ({ userView, onClose }) => {
  const [userInfo, setUserInfo] = useState<USER_RULE_TYPE>(
    userView.userMeta?.rule
  );

  const { isPendingUpdate, updateUser } = useAdminUsers(onClose);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedRole =
      Number(value) === USER_RULE_TYPE.ADMIN
        ? USER_RULE_TYPE.ADMIN
        : USER_RULE_TYPE.USER;
    setUserInfo(selectedRole);
  };

  const handleUpdateUser = () => {
    const dataUpdate: UpdateUserRequest = {
      uid: userView.userMeta.userId,
      rule: userInfo,
    };
    updateUser(dataUpdate);
  };

  return (
    <FormEditUser>
      <GroupInput>
        <Label>Email</Label>
        <NameInput disabled name='email' value={userView.userRecord?.email} />
      </GroupInput>
      <GroupInput>
        <Label>Role</Label>
        <SelectWrapper>
          <SelectCustom onChange={handleChange} value={userInfo} name='rule'>
            <OptionCustom value={USER_RULE_TYPE.ADMIN}>Admin</OptionCustom>
            <OptionCustom value={USER_RULE_TYPE.USER}>User</OptionCustom>
          </SelectCustom>
        </SelectWrapper>
      </GroupInput>
      <ButtonGroup>
        <Button
          options={{
            type: BUTTON_TYPE.SECONDARY_SUBTLE_SMALL,
            title: 'Cancel',
          }}
          disabled={isPendingUpdate}
          onClick={onClose}
        />
        <Button
          options={{
            type: BUTTON_TYPE.PRIMARY_DEFAULT_SMALL,
            title: 'Apply',
          }}
          disabled={isPendingUpdate}
          onClick={handleUpdateUser}
        />
      </ButtonGroup>
    </FormEditUser>
  );
};
