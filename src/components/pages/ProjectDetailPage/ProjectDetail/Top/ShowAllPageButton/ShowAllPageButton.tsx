import { Button } from '@/components/ui/Button';
import { ProjectType } from '@/models/GetProjectType';
import { BUTTON_TYPE } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { atom, useSetAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';
import ArrowIcon from './assets/arrow-vertical.svg';

export const showAllPagesAtom = atom(false);

export const ShowAllPageButton: FC = () => {
  const setAllPagesShow = useSetAtom(showAllPagesAtom);

  const params = useSearchParams();
  const projectId = params.get('projectId');
  const queryClient = useQueryClient();

  const projectDetail = queryClient.getQueryData<ProjectType>([projectId]);
  const pageSnapshotsLength = projectDetail?.pageSnapShot?.length;

  const pagesCount = useMemo(
    () => pageSnapshotsLength || 0,
    [pageSnapshotsLength]
  );

  const handleToggle = useCallback(() => {
    if (!projectId) {
      return;
    }

    if (!pageSnapshotsLength) {
      return;
    }

    setAllPagesShow((prev) => !prev);
  }, [pageSnapshotsLength, projectId, setAllPagesShow]);

  return (
    <Button
      onClick={handleToggle}
      options={{
        type: BUTTON_TYPE.SECONDARY_SUBTLE_LARGE,
        title: `Page list (${pagesCount})`,
        icon: ArrowIcon,
      }}
    />
  );
};
