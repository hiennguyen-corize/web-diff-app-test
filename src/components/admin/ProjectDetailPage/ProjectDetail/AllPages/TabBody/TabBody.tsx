'use client';
import { FC, useCallback } from 'react';
import { PageSnapshot } from './PageSnapshot';

import { useTableCommit } from './useTableCommit';

/**
 * Renders the body of the Tab component.
 *
 * @return {JSX.Element} The rendered body of the Tab component.
 */
export const TabBody: FC = () => {
  const { pageSnapShots, isDeleting, deletePageSnap } = useTableCommit();

  const handleDeletePageSnapShot = useCallback(
    (pageSnapShotId?: string) => {
      deletePageSnap(pageSnapShotId);
    },
    [deletePageSnap]
  );

  return (
    <tbody>
      {pageSnapShots?.map((pageSnap) => (
        <PageSnapshot
          handleDeletePageSnapShot={handleDeletePageSnapShot}
          isDeleting={isDeleting}
          pageSnap={pageSnap}
          key={pageSnap.id}
        />
      ))}
    </tbody>
  );
};

TabBody.displayName = 'TabBody';
