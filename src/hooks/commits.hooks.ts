import { GetCommitsRequestType } from '@/models/GetCommitsType';
import { getCommits } from '@/services/commits';
import { FirebaseError } from 'firebase/app';
import { useCallback } from 'react';
import { useNotification } from './useNotification';

export const useCommits = () => {
  const { setNotification } = useNotification();

  const getCommitList = useCallback(
    async (payload: GetCommitsRequestType) => {
      try {
        const { data, hasMore } = await getCommits(payload);
        return { commits: data, hasMore };
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof FirebaseError
              ? error.message
              : 'Something went wrong',
        });
      }
    },
    [setNotification]
  );

  return {
    getCommitList,
  };
};
