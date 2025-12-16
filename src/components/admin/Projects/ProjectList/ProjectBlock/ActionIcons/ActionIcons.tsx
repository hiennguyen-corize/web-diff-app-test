import { UseMutateFunction } from '@tanstack/react-query';
import { FC } from 'react';
import { MoreActions } from './MoreActions';
import { GroupIcon } from './styles';

type Props = {
  projectId: string;
  projectName: string;
  projectDescription: string;
  onDeleteProject: UseMutateFunction<
    void,
    Error,
    {
      deleteProjectId: string;
    },
    unknown
  >;
};

export const ActionIcons: FC<Props> = ({
  projectId,
  projectName,
  onDeleteProject,
  projectDescription,
}) => {
  return (
    <GroupIcon>
      <MoreActions
        projectId={projectId}
        projectName={projectName}
        onDeleteProject={onDeleteProject}
        projectDescription={projectDescription}
      />
    </GroupIcon>
  );
};
