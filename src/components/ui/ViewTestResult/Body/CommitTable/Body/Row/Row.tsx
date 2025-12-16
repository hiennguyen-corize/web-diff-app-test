import { ScreenshotStatus } from '@/components/ui/ScreenshotStatus';
import { useQueryString } from '@/hooks/useQueryString';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import dayjs from 'dayjs';
import { first, last } from 'lodash';
import { FC, memo, useCallback } from 'react';
import { DateWrapper, Td, Tr, UrlWrapper } from './styles';

type Props = {
  pageSnapshot: CommitPageSnapshotType;
  click: () => void;
  commitId: string;
};

/**
 * A table row component for displaying commit page snapshot information.
 *
 * @param {CommitPageSnapshotType} pageSnapshot - The commit page snapshot data.
 * @param {string} commitId - The ID of the commit.
 * @return {JSX.Element} A table row element containing the commit page snapshot information.
 */
export const Row: FC<Props> = memo(({ pageSnapshot, commitId, click }) => {
  const datetime = dayjs(pageSnapshot.createdAt).format('DD/MM/YYYY HH:mm:ss');
  const dateAndTime = datetime.split(' ');

  const { navigate, createQueryString } = useQueryString();

  const canClick =
    !!pageSnapshot.screenshot.comparedImages?.desktop &&
    !!pageSnapshot.screenshot.compareTo?.imagePaths?.desktop &&
    !!pageSnapshot.screenshot.comparedImages?.tablet &&
    !!pageSnapshot.screenshot.compareTo?.imagePaths?.tablet &&
    !!pageSnapshot.screenshot.comparedImages?.mobile &&
    !!pageSnapshot.screenshot.compareTo?.imagePaths?.mobile;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (!canClick) {
        return;
      }

      click();

      navigate(
        createQueryString([
          { name: 'commitId', value: commitId },
          { name: 'pageSnapshotId', value: pageSnapshot.id },
        ])
      );
    },
    [canClick, click, commitId, createQueryString, navigate, pageSnapshot.id]
  );

  const screenshotExeTimeSec =
    pageSnapshot.screenshot?.compareTo?.screenshotExeTimeSeconds;

  const screenshotExeTimeSeconds = screenshotExeTimeSec
    ? `${screenshotExeTimeSec} sec`
    : '-';

  return (
    <Tr key={pageSnapshot.id} onClick={handleClick} $canClick={canClick}>
      <Td>
        <UrlWrapper>{pageSnapshot.url}</UrlWrapper>
      </Td>
      <Td>
        <ScreenshotStatus status={pageSnapshot.status} onClick={handleClick} />
      </Td>
      <Td>
        <span>{screenshotExeTimeSeconds}</span>
      </Td>
      <Td>
        <DateWrapper>
          <span>{first(dateAndTime)}</span>
          <span>{last(dateAndTime)}</span>
        </DateWrapper>
      </Td>
    </Tr>
  );
});

Row.displayName = 'Row';
