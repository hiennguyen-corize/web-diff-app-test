import { ShowNotification } from '@/models/common';
import { FC } from 'react';
import {
  ContentWrapper,
  Description,
  Icon,
  NotificationWrapper,
} from './styles';

export type NotificationProps = {
  notification: ShowNotification;
  icon: string;
};

export const Notification: FC<NotificationProps> = ({ notification, icon }) => {
  return (
    <NotificationWrapper
      $menuVisible={true}
      type={notification.type}
      $menuTop={true}
    >
      <Icon src={icon} />

      <ContentWrapper>
        <Description>{notification.message}</Description>
      </ContentWrapper>
    </NotificationWrapper>
  );
};
