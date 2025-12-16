import { Time } from '@/components/ui/Time';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import DeleteIcon from './assets/delete.svg';
import { Button, Td, Tr, UrlWrapper } from './styles';

type Props = {
  handleDeletePageSnapShot: (pageSnapShotId?: string) => void;
  pageSnap: PageSnapShotType;
  isDeleting: boolean;
};

/**
 * A functional component that represents a page snapshot.
 *
 * It displays the page URL, creation time, and provides an action to delete the snapshot.
 *
 * @param {function} handleDeletePageSnapShot - A function to handle the deletion of a page snapshot.
 * @param {object} pageSnap - The page snapshot object containing the URL and creation time.
 * @param {boolean} isDeleting - A flag indicating whether the page snapshot is being deleted.
 * @return {JSX.Element} The JSX element representing the page snapshot.
 */
export const PageSnapshot: FC<Props> = ({
  handleDeletePageSnapShot,
  pageSnap,
  isDeleting,
}) => {
  return (
    <Tr>
      <Td>
        <Link href={pageSnap.url} target='_blank'>
          <UrlWrapper>{pageSnap.url}</UrlWrapper>
        </Link>
      </Td>
      <Td>
        <Time time={pageSnap.createdAt} />
      </Td>
      <Td>
        <Button
          disabled={isDeleting}
          onClick={() => handleDeletePageSnapShot(pageSnap.id)}
        >
          <Image src={DeleteIcon} width={24} height={24} alt='delete-icon' />
        </Button>
      </Td>
    </Tr>
  );
};

PageSnapshot.displayName = 'PageSnapshot';
