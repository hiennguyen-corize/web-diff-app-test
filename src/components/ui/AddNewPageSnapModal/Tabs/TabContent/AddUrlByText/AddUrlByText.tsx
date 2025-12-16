import { useAddPageSnapshot } from '@/components/ui/AddNewPageSnapModal/useAddPageSnapshot.hooks';
import { Button } from '@/components/ui/Button';
import { FormItem } from '@/components/ui/Form/FormItem';
import { Input } from '@/components/ui/Form/Input';
import { BUTTON_TYPE } from '@/types';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Custom } from './styles';

type Props = { onClose: () => void };

export const AddUrlByText: FC<Props> = ({ onClose }) => {
  const { addNewPageSnap, isAddingNewPage } = useAddPageSnapshot(onClose);

  const { control, handleSubmit } = useForm({
    defaultValues: { newUrl: '' },
  });

  return (
    <form onSubmit={handleSubmit((form) => addNewPageSnap(form))}>
      <div>
        <Controller
          control={control}
          name='newUrl'
          rules={{
            required: 'Url is required',
            pattern: {
              value: /^(https?:\/\/)([\w\-]+\.)+[\w]{2,}(:\d+)?(\/.*)?$/,
              message: 'Invalid url',
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormItem
              options={{
                isError: !!error?.message,
                marginBottom: !!error?.message ? 15 : 0,
              }}
            >
              <Input
                name='newUrl'
                type='text'
                value={value}
                disabled={isAddingNewPage}
                isError={!!error?.message}
                errorMessage={error?.message}
                placeholder='example: https://example.com'
                onChange={onChange}
              />
            </FormItem>
          )}
        />
      </div>
      <Custom>
        <Button
          type='submit'
          disabled={isAddingNewPage}
          onClick={(event) => event.stopPropagation()}
          options={{
            type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
            title: 'Add New Page',
          }}
        />
      </Custom>
    </form>
  );
};
