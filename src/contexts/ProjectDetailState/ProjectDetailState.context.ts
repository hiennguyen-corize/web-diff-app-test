import { PROJECT_DETAIL_STATE_TYPE } from '@/types';
import React, { Dispatch, SetStateAction } from 'react';

type ProjectDetailStateContextType = {
  projectDetailScreenState: PROJECT_DETAIL_STATE_TYPE | undefined;
  setProjectDetailScreenState: Dispatch<
    SetStateAction<PROJECT_DETAIL_STATE_TYPE | undefined>
  >;
};

export const ProjectDetailStateContext =
  React.createContext<ProjectDetailStateContextType>({
    projectDetailScreenState: PROJECT_DETAIL_STATE_TYPE.DEFAULT,
    setProjectDetailScreenState: () => {
      // do nothing
    },
  });
