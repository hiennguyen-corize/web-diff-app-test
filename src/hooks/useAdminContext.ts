'use client';
import { AdminContext } from '@/contexts/AdminContext';
import { useContext } from 'react';

export const useAdminContext = () => {
  return useContext(AdminContext);
};
