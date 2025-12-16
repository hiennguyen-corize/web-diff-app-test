import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useRevalidate = () => {
  const queryClient = useQueryClient();

  const revalidate = useCallback(
    async (queryKey: (string | number)[]) => {
      await queryClient.invalidateQueries({ queryKey });
    },
    [queryClient]
  );

  return revalidate;
};
