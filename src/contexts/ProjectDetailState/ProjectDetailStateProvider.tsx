'use client';
import { FC, useState } from 'react';

import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import { ProjectDetailStateContext } from './ProjectDetailState.context';
type Props = {
  children: React.ReactNode;
};

export const ProjectDetailStateProvider: FC<Props> = ({ children }) => {
  const [projectDetailScreenState, setProjectDetailScreenState] = useState<
    PROJECT_DETAIL_STATE_TYPE | undefined
  >();

  return (
    <ProjectDetailStateContext.Provider
      value={{ projectDetailScreenState, setProjectDetailScreenState }}
    >
      {children}
    </ProjectDetailStateContext.Provider>
  );
};
