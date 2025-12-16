import { ProjectDetailStateContext } from '@/contexts/ProjectDetailState';
import { useContext } from 'react';

export const useFirstScreen = () => {
  return useContext(ProjectDetailStateContext);
};
