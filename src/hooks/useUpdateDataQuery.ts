import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useUpdateDataQuery = () => {
  const queryClient = useQueryClient();
  const updateDataQuery = useCallback(
    <T>(key: (string | null)[], callback: T) => {
      queryClient.setQueryData(key, callback);
    },
    [queryClient]
  );

  return updateDataQuery;
};
