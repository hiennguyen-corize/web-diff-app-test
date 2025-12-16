import { uploadUrlList } from '@/components/ui/AddNewPageSnapModal/Tabs/TabContent/AddUrlByCsv';
import { ProjectType } from '@/models/GetProjectType';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { intersectionBy, keyBy } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Url } from './Url';
import { ErrorWrapper, ListUrlItem } from './styles';

export const ParseUrlList = () => {
  const [uploadUrls, setUploadUrls] = useAtom(uploadUrlList);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');

  const project = queryClient.getQueryData<ProjectType>([projectId]);
  const projectSnapshot = project?.pageSnapShot;

  const duplicateUrls = intersectionBy(projectSnapshot, uploadUrls, 'url');
  const duplicateUrlsObject = keyBy(duplicateUrls, 'url');

  const handleChangeApproved = useCallback(
    (urlId: number) => {
      setUploadUrls((prev) => {
        const newUrls = [...prev];
        const newUrlsObject = keyBy(newUrls, 'id');
        const urlObject = newUrlsObject[urlId];

        if (urlObject) {
          urlObject.isAllow
            ? (urlObject.approved = !urlObject.approved)
            : (urlObject.approved = false);
        }

        return Object.values(newUrlsObject);
      });
    },
    [setUploadUrls]
  );

  return (
    <ListUrlItem>
      {uploadUrls.map((urlItem) => (
        <div key={urlItem.id}>
          <Url
            urlItem={urlItem}
            onChangeApproved={() => handleChangeApproved(urlItem.id)}
          />
          {!urlItem.isAllow && <ErrorWrapper>{'Invalid url!'}</ErrorWrapper>}
          {!!duplicateUrlsObject[urlItem.url] && (
            <ErrorWrapper>{'Url already exists!'}</ErrorWrapper>
          )}
        </div>
      ))}
    </ListUrlItem>
  );
};
