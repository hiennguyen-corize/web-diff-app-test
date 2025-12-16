import { AddNewPageSnapModal } from '@/components/ui/AddNewPageSnapModal';
import { Button } from '@/components/ui/Button';
import { useBooleanState } from '@/hooks/useBooleanState';
import { BUTTON_TYPE } from '@/types';
import { FC } from 'react';
import AddNewIcon from './assets/add-new.svg';

export const AddNewButton: FC = () => {
  const {
    boolean: isNewPageModalActive,
    setFalse: setNewPageModalClose,
    setTrue: setNewPageModalOpen,
  } = useBooleanState(false);

  return (
    <div>
      <AddNewPageSnapModal
        open={isNewPageModalActive}
        onClose={setNewPageModalClose}
      />
      <Button
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title: 'Add new page',
          icon: AddNewIcon,
        }}
        onClick={setNewPageModalOpen}
      />
    </div>
  );
};
