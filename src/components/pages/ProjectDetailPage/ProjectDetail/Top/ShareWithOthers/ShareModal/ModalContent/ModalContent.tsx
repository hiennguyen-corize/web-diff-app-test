import { useCollaborator } from '@/hooks/useCollaborator.hooks';
import { useCopyCurrentUrl } from '@/hooks/useCopyCurrentUrl.hooks';
import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { ProjectType } from '@/models/GetProjectType';
import { SHARE_SCREEN_TYPE } from '@/types';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';
import BigArrowIcon from './assets/bigArrow.svg';
import CopyLinkIcon from './assets/copyLink.svg';
import MemberIcon from './assets/member.svg';
import { MailInput } from './MailInput';
import { Member } from './Member';
import {
  AccessTitle,
  CanAccessControl,
  CopyLinkWrapper,
  CopyTitle,
  MemberListWrapper,
  MemberWrapper,
  ModalHeader,
  Screen,
  ScreenWrapper,
  Title,
  Wrapper,
} from './styles';
import { useMemberBasicInfo } from './useMembersBasicInfo.hooks';

type Props = {
  screen: SHARE_SCREEN_TYPE;
  setScreen: Dispatch<SetStateAction<SHARE_SCREEN_TYPE>>;
};

export const ModalContent: FC<Props> = ({ screen, setScreen }) => {
  const { handleRemoveCollaborator } = useCollaborator();
  const { copyCurrentUrl } = useCopyCurrentUrl();

  const params = useSearchParams();
  const projectId = params.get('projectId');

  const collaboratorEmails = useGetFetchQuery<ProjectType>([
    projectId ?? '',
  ])?.collaborators;

  const { collaboratorsObject } = useMemberBasicInfo(
    screen === SHARE_SCREEN_TYPE.SECOND,
    collaboratorEmails
  );

  return (
    <Wrapper $screen={screen}>
      <ScreenWrapper $screen={screen}>
        <Screen>
          <ModalHeader left={0} right={50}>
            <Title>Share this project</Title>
            <CopyLinkWrapper onClick={copyCurrentUrl}>
              <Image src={CopyLinkIcon} alt='copy-icon' />
              <CopyTitle>Copy link</CopyTitle>
            </CopyLinkWrapper>
          </ModalHeader>
          <MailInput />
          <CanAccessControl>
            <AccessTitle>Who has access</AccessTitle>
            <MemberListWrapper
              onClick={() => setScreen(SHARE_SCREEN_TYPE.SECOND)}
            >
              <Image src={MemberIcon} alt='member-icon' /> Member List
            </MemberListWrapper>
          </CanAccessControl>
        </Screen>
        <Screen>
          <ModalHeader left={50} right={0}>
            <Title
              $isCursorPointer
              onClick={() => setScreen(SHARE_SCREEN_TYPE.FIRST)}
            >
              <Image src={BigArrowIcon} alt='arrow-icon' />
              Share this project
            </Title>
            <CopyLinkWrapper onClick={copyCurrentUrl}>
              <Image src={CopyLinkIcon} alt='copy-icon' />
              <CopyTitle>Copy link</CopyTitle>
            </CopyLinkWrapper>
          </ModalHeader>

          <MemberWrapper>
            {collaboratorEmails?.map((email) => (
              <Member
                key={email}
                email={email}
                photoURL={collaboratorsObject[email]?.photoURL}
                handleRemoveCollaborator={handleRemoveCollaborator}
              />
            ))}
          </MemberWrapper>
        </Screen>
      </ScreenWrapper>
    </Wrapper>
  );
};
