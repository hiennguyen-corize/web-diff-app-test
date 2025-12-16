import Loader from '@/components/admin/common/Loader';
import { useAddPageSnapBySitemap } from '@/components/ui/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv/AddPageByCsvButton/useAddPageSnapBySitemap';
import { Button } from '@/components/ui/Button';
import { FormItem } from '@/components/ui/Form/FormItem';
import { Input } from '@/components/ui/Form/Input';
import { BUTTON_TYPE } from '@/types';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Custom } from './styles';

type Props = { onClose: () => void };

export const AddUrlBySitemap: FC<Props> = ({ onClose }) => {
  const { addPageSnapshotBySitemap, isAddingPagesBySitemap } =
    useAddPageSnapBySitemap(onClose);

  const { control, handleSubmit } = useForm({
    defaultValues: { sitemapUrl: '' },
  });

  return (
    <form onSubmit={handleSubmit((form) => addPageSnapshotBySitemap(form))}>
      <div>
        <Controller
          control={control}
          name='sitemapUrl'
          rules={{
            required: 'Sitemap url is required',
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
                name='sitemapUrl'
                type='text'
                value={value}
                disabled={isAddingPagesBySitemap}
                isError={!!error?.message}
                errorMessage={error?.message}
                placeholder='example: https://example.com/sitemap.xml'
                onChange={onChange}
              />
            </FormItem>
          )}
        />
      </div>
      <div>
        <Custom>
          <Button
            type='submit'
            disabled={isAddingPagesBySitemap}
            options={{
              type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
              title: 'Add New Page',
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {isAddingPagesBySitemap && <Loader />}
            Add new
          </Button>
        </Custom>
      </div>
    </form>
  );
};
