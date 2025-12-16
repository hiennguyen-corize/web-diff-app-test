import { useQueryClient } from '@tanstack/react-query';

export const useGetFetchQuery = <T>(
  key: (string | string[])[]
): T | undefined => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(key);
};
