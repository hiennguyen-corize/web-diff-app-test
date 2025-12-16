'use client';
import { ShowNotification } from '@/models/common';
import React, { FC, useState } from 'react';
import { NotificationContext } from './Notification.context';

type Props = {
  children: React.ReactNode;
};

/* Notification component */
export const NotificationProvider: FC<Props> = ({ children }) => {
  const [notification, setNotification] = useState<ShowNotification | null>(
    null
  );

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.displayName = 'NotificationProvider';
