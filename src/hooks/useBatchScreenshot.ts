import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { batchScreenshotWithRetry, cancelBatchScreenshot, getBatchScreenshotHistory } from '@/services/batchScreenshot';
import type { RetryPolicy } from '@/services/batchScreenshot';
import { useState } from 'react';

const BATCH_QUERY_KEY = 'batch-screenshot';

/**
 * Hook to manage batch screenshot operations with retry.
 */
export const useBatchScreenshot = (projectId: string, userId: string) => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<number>(0);

  const historyQuery = useQuery({
    queryKey: [BATCH_QUERY_KEY, 'history', projectId],
    queryFn: () => getBatchScreenshotHistory(projectId),
  });

  const runMutation = useMutation({
    mutationFn: (retryPolicy?: RetryPolicy) =>
      batchScreenshotWithRetry(projectId, userId, retryPolicy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BATCH_QUERY_KEY] });
      setProgress(100);
    },
    onError: () => {
      setProgress(0);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelBatchScreenshot(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BATCH_QUERY_KEY] });
    },
  });

  return {
    history: historyQuery.data,
    isLoadingHistory: historyQuery.isLoading,
    runBatch: runMutation.mutateAsync,
    cancelBatch: cancelMutation.mutateAsync,
    isRunning: runMutation.isPending,
    isCancelling: cancelMutation.isPending,
    batchResult: runMutation.data,
    error: runMutation.error,
    progress,
  };
};
