import { Button } from '@/components/ui/Button';
import { useBooleanState } from '@/hooks/useBooleanState';
import { BUTTON_TYPE } from '@/types';
import { FC, memo } from 'react';
import { CreateProjectModal } from './CreateProjectModal';
import { CreateProjectButton } from './styles';
import { useLimitProjectCreate } from './useLimitProjectCreate.hooks';

export const AddNewProject: FC = memo(() => {
  const {
    boolean: isModalOpen,
    setFalse: handleCloseModal,
    setTrue: handleOpenModal,
  } = useBooleanState(false);

  const { handleCheckCreateProject } = useLimitProjectCreate();

  return (
    <div>
      <CreateProjectButton>
        <Button
          options={{
            title: 'Create project',
            type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          }}
          onClick={() => handleCheckCreateProject(handleOpenModal)}
        />
      </CreateProjectButton>
      <CreateProjectModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
      />
    </div>
  );
});

AddNewProject.displayName = 'AddNewProject';
