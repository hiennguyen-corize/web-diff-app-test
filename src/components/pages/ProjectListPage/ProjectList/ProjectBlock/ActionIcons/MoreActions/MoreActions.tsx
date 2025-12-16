import { useBooleanState } from '@/hooks/useBooleanState';
import { useClickOutside } from '@/utils/clickOutside';
import { UseMutateFunction } from '@tanstack/react-query';
import Image from 'next/image';
import { FC, useCallback, useRef } from 'react';
import Dropdown from './assets/Dropdown.svg';
import { EditProjectModal } from './EditProject';
import {
  DropdownButton,
  DropdownItem,
  DropdownList,
  DropdownMenu,
  DropdownWrapper,
} from './styles';

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

export const MoreActions: FC<Props> = ({
  projectId,
  projectName,
  onDeleteProject,
  projectDescription,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    boolean: isDropdownOpen,
    setFalse: hideDropdown,
    toggle: toggleDropdown,
  } = useBooleanState(false);

  const {
    boolean: isOpenEditProjectModal,
    setFalse: setEditProjectHide,
    setTrue: setEditProjectOpen,
  } = useBooleanState(false);

  useClickOutside(dropdownRef, hideDropdown);

  const handleShowDropdown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      toggleDropdown();
    },
    [toggleDropdown]
  );

  const deleteProject = useCallback(() => {
    hideDropdown();
    onDeleteProject({ deleteProjectId: projectId });
  }, [hideDropdown, onDeleteProject, projectId]);

  return (
    <DropdownWrapper
      onClick={(event) => event.stopPropagation()}
      ref={dropdownRef}
    >
      <EditProjectModal
        projectDescription={projectDescription}
        isOpen={isOpenEditProjectModal}
        onClose={setEditProjectHide}
        projectName={projectName}
        projectId={projectId}
      />
      <DropdownButton type='button' onClick={handleShowDropdown}>
        <Image width={24} height={24} src={Dropdown} alt='Dropdown-icon' />
      </DropdownButton>
      {isDropdownOpen && (
        <DropdownMenu>
          <DropdownList>
            <DropdownItem>
              <button
                onClick={() => {
                  setEditProjectOpen();
                  toggleDropdown();
                }}
              >
                Edit
              </button>
            </DropdownItem>
            <DropdownItem>
              <button onClick={deleteProject}>Delete</button>
            </DropdownItem>
          </DropdownList>
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
};
