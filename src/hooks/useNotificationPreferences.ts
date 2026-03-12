import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getNotificationPreferences,
  resetNotificationPreferences,
  updateNotificationPreferences,
} from '@/services/notificationPreferences';
import type { UpdateNotificationPreferencesRequest } from '@/types/notification';

const QUERY_KEY = ['notification-preferences'] as const;

/**
 * Hook to fetch and manage notification preferences.
 * Provides get, update, and reset operations.
 */
export const useNotificationPreferences = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...QUERY_KEY, userId],
    queryFn: () => getNotificationPreferences(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateMutation = useMutation({
    mutationFn: (updates: UpdateNotificationPreferencesRequest) =>
      updateNotificationPreferences(userId!, updates),
    onSuccess: (data) => {
      queryClient.setQueryData([...QUERY_KEY, userId], data);
    },
  });

  const resetMutation = useMutation({
    mutationFn: () => resetNotificationPreferences(userId!),
    onSuccess: (data) => {
      queryClient.setQueryData([...QUERY_KEY, userId], data);
    },
  });

  return {
    preferences: query.data,
    isLoading: query.isLoading,
    error: query.error,
    updatePreferences: updateMutation.mutateAsync,
    resetPreferences: resetMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isResetting: resetMutation.isPending,
  };
};
