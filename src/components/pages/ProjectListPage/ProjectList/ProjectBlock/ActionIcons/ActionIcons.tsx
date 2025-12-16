import { UseMutateFunction } from '@tanstack/react-query';
import { FC } from 'react';
import { MoreActions } from './MoreActions';
import { GroupIcon } from './styles';

type Props = {
  isOwner: boolean;
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
  isOwner,
  projectId,
  projectName,
  onDeleteProject,
  projectDescription,
}) => {
  if (!isOwner) {
    return null;
  }

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
