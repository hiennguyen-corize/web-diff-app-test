import { UseMutateFunction } from '@tanstack/react-query';
import Image from 'next/image';
import { FC, memo, useState } from 'react';
import AvatarIcon from './assets/avatarMockup.svg';
import DeleteIcon from './assets/delete.svg';
import {
  AvatarWrapper,
  MemberItem,
  MemberMain,
  Name,
  TrashButton,
} from './styles';

type Props = {
  email: string;
  photoURL?: string;
  handleRemoveCollaborator: UseMutateFunction<void, Error, string, unknown>;
};

export const Member: FC<Props> = memo(
  ({ email, photoURL, handleRemoveCollaborator }) => {
    const [isRemovePending, setIsRemovePending] = useState(false);

    return (
      <MemberItem $disabled={isRemovePending}>
        <MemberMain>
          <AvatarWrapper>
            <Image
              width={48}
              height={48}
              src={photoURL || AvatarIcon}
              alt='member-icon'
            />
          </AvatarWrapper>
          <Name>{email}</Name>
        </MemberMain>
        <TrashButton
          disabled={isRemovePending}
          onClick={() => {
            setIsRemovePending(true);
            handleRemoveCollaborator(email);
          }}
        >
          <Image src={DeleteIcon} alt='delete-icon' />
        </TrashButton>
      </MemberItem>
    );
  }
);

Member.displayName = 'Member';
