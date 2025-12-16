'use client';
import { NotificationContext } from '@/contexts/Notification';
import { useContext } from 'react';

export const useNotification = () => {
  return useContext(NotificationContext);
};
