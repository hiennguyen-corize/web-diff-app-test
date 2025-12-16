import Loader from '@/components/admin/common/Loader';
import {
  DisplayUrlType,
  uploadUrlList,
} from '@/components/ui/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv';
import { Button } from '@/components/ui/Button';
import { useAddMultiPages } from '@/hooks/useAddMultiPages';
import { BUTTON_TYPE } from '@/types';
import { useAtomValue } from 'jotai';
import { FC, useCallback } from 'react';
import { Custom } from './styles';

type Props = { onClose: () => void };

export const AddPageByCsvButton: FC<Props> = ({ onClose }) => {
  const uploadUrls = useAtomValue(uploadUrlList);

  const handleUploadUrls = useCallback((uploadUrls: DisplayUrlType[]) => {
    const formatUrls: string[] = [];

    uploadUrls.forEach((urlItem) => {
      if (urlItem.approved && urlItem.isAllow) {
        formatUrls.push(urlItem.url);
      }
    });
    return formatUrls;
  }, []);

  const { addMultiPages, isAddMultiPagesPending } = useAddMultiPages(onClose);

  return (
    <Custom>
      <Button
        disabled={isAddMultiPagesPending}
        onClick={() => addMultiPages(handleUploadUrls(uploadUrls))}
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title: 'Add New Page',
        }}
      >
        {isAddMultiPagesPending && <Loader />}
      </Button>
    </Custom>
  );
};
