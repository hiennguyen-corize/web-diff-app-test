'use client';
import { ShowNotification } from '@/models/common';
import React from 'react';

type NotificationContext = {
  notification: ShowNotification | null;
  setNotification: React.Dispatch<
    React.SetStateAction<ShowNotification | null>
  >;
};

export const NotificationContext = React.createContext<NotificationContext>({
  notification: null,
  setNotification: () => {
    // do not thing
  },
});
