import { Button } from '@/components/ui/Button';
import { PortalModal } from '@/components/ui/PortalModal';
import { BUTTON_TYPE } from '@/types';
import { ChangeEvent, FC, memo, useCallback } from 'react';
import {
  ButtonGroup,
  FormCreateProject,
  GroupInput,
  Label,
  ProjectInput,
  TextArea,
  WrapperModal,
} from './styles';
import { useEditProject } from './useEditProject.hooks';

type Props = {
  isOpen: boolean;
  projectId: string;
  onClose: () => void;
  projectName: string;
  projectDescription: string;
};

export const EditProjectModal: FC<Props> = memo(
  ({ isOpen, onClose, projectId, projectName, projectDescription }) => {
    const {
      editProjectName,
      isEditSubmitting,
      setEditProjectName,
      editCurrentProject,
      editProjectDescription,
      setEditProjectDescription,
    } = useEditProject(projectName, projectDescription);

    const handleChangeProjectName = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setEditProjectName(event.target.value);
      },
      [setEditProjectName]
    );

    const handleChangeProjectDescription = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.stopPropagation();
        const value = event.target.value;
        setEditProjectDescription(value);
      },
      [setEditProjectDescription]
    );

    const handleApplyEditProject = useCallback(async () => {
      editCurrentProject({
        projectId,
        callback: onClose,
      });
    }, [editCurrentProject, onClose, projectId]);

    const handleCancelEditProject = useCallback(() => {
      setEditProjectDescription(projectDescription);
      setEditProjectName(projectName);
      onClose();
    }, [
      onClose,
      projectDescription,
      projectName,
      setEditProjectDescription,
      setEditProjectName,
    ]);

    return (
      <WrapperModal>
        <PortalModal
          open={isOpen}
          onClose={handleCancelEditProject}
          title='Edit Project'
          widthModal='762px'
        >
          <FormCreateProject>
            <GroupInput>
              <Label>Project name</Label>
              <ProjectInput
                type='text'
                placeholder='Enter your project name'
                onChange={handleChangeProjectName}
                value={editProjectName}
              />
            </GroupInput>
            <GroupInput>
              <Label>Description</Label>
              <TextArea
                onChange={handleChangeProjectDescription}
                placeholder='Enter information relevant to your project'
                value={editProjectDescription}
              />
            </GroupInput>

            <ButtonGroup>
              <Button
                options={{
                  type: BUTTON_TYPE.SECONDARY_SUBTLE_SMALL,
                  title: 'Cancel',
                }}
                onClick={handleCancelEditProject}
              />
              <Button
                options={{
                  type: BUTTON_TYPE.PRIMARY_DEFAULT_SMALL,
                  title: 'Apply',
                }}
                disabled={isEditSubmitting}
                onClick={handleApplyEditProject}
              />
            </ButtonGroup>
          </FormCreateProject>
        </PortalModal>
      </WrapperModal>
    );
  }
);

EditProjectModal.displayName = 'EditProjectModal';
