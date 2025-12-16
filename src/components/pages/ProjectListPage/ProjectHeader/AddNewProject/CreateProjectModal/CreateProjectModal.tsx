import { Button } from '@/components/ui/Button';
import { FormItem } from '@/components/ui/Form/FormItem';
import { Input } from '@/components/ui/Form/Input';
import { TextArea } from '@/components/ui/Form/TextArea';
import { PortalModal } from '@/components/ui/PortalModal';
import { MODAL_WIDTH } from '@/constants/common';
import { BUTTON_TYPE } from '@/types';
import { FC, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ButtonGroup,
  CustomInput,
  FormCreateProject,
  WrapperModel,
} from './styles';
import { useAddProject } from './useAddProject.hooks';

type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

export const CreateProjectModal: FC<Props> = ({
  handleCloseModal,
  isModalOpen,
}) => {
  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: { name: '', description: '' },
  });

  const closeModal = useCallback(() => {
    handleCloseModal();
    resetForm();
  }, [handleCloseModal, resetForm]);

  const { addAProject, isAddingProject } = useAddProject(closeModal);

  return (
    <WrapperModel>
      <PortalModal
        open={isModalOpen}
        widthModal={`${MODAL_WIDTH}px`}
        onClose={closeModal}
        title='Add new project'
        subTitle='Our support team will get back to you ASAP via email'
      >
        <FormCreateProject onSubmit={handleSubmit((form) => addAProject(form))}>
          <Controller
            control={control}
            name='name'
            rules={{
              required: 'Project name is required',
              validate: (value) =>
                value.trim() !== '' || 'Project name is empty',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem
                label='Project name'
                options={{ isError: !!error?.message, marginBottom: 10 }}
              >
                <CustomInput $isError={!!error?.message}>
                  <Input
                    name='name'
                    type='text'
                    value={value}
                    disabled={isAddingProject}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    placeholder='Enter your project name'
                    onChange={onChange}
                  />
                </CustomInput>
              </FormItem>
            )}
          />

          <Controller
            control={control}
            name='description'
            rules={{
              required: 'Project description is required',
              validate: (value) =>
                value.trim() !== '' || 'Project description is empty',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormItem
                label='Description'
                options={{ isError: !!error?.message, marginBottom: 5 }}
              >
                <CustomInput $isError={!!error?.message}>
                  <TextArea
                    onChange={onChange}
                    name='description'
                    value={value}
                    disabled={isAddingProject}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    placeholder='Enter information relevant to your project'
                  />
                </CustomInput>
              </FormItem>
            )}
          />

          <ButtonGroup>
            <Button
              disabled={isAddingProject}
              options={{
                type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
                title: 'Create',
              }}
              type='submit'
              onClick={(event) => event.stopPropagation()}
            />
          </ButtonGroup>
        </FormCreateProject>
      </PortalModal>
    </WrapperModel>
  );
};
