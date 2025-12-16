import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import {
  ApproveCommitRequest,
  ApproveCommitResponse,
} from '@/models/ApproveCommit';
import { CommitType } from '@/models/GetCommitsType';
import { ProjectType } from '@/models/GetProjectType';
import { approveCommit, cancelCommit, rejectCommit } from '@/services/commit';
import { COMMIT_STATE } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { useTransitionRouter } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useAdminContext } from './useAdminContext';
import { useProjectPermission } from './useProjectPermission.hooks';

export const useApproveCommit = () => {
  const params = useSearchParams();
  const { isAdmin } = useAdminContext();
  const queryClient = useQueryClient();
  const { push } = useTransitionRouter();
  const projectId = params.get('projectId');
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const { checkUserPermission } = useProjectPermission();

  const onApproveSuccess = useCallback(
    (response: ApproveCommitResponse, previousCommitId?: string) => {
      if (!response.data || !projectId) {
        return;
      }

      const commitId = response.data.approvedCommitId;

      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProject = cloneDeep(prev);
        newProject.approvedCommitId = commitId;
        return newProject;
      });

      updateDataQuery(
        [projectId, 'commits'],
        (prev: { commits: CommitType[]; hasMore: boolean }) => {
          const newCommitsResponse = cloneDeep(prev);

          newCommitsResponse.commits = newCommitsResponse.commits.map(
            (commit) => {
              if (commit.id === commitId) {
                return {
                  ...commit,
                  state: COMMIT_STATE.APPROVED,
                };
              }

              if (previousCommitId && commit.id === previousCommitId) {
                return {
                  ...commit,
                  state: COMMIT_STATE.REJECTED,
                };
              }

              return commit;
            }
          );

          return newCommitsResponse;
        }
      );

      setNotification({ type: 'success', message: response.message });
    },
    [projectId, setNotification, updateDataQuery]
  );

  const onRejectSuccess = useCallback(
    (response: { message: string }, commitId: string) => {
      updateDataQuery(
        [projectId, 'commits'],
        (prev: { commits: CommitType[]; hasMore: boolean }) => {
          const newCommitsResponse = cloneDeep(prev);

          newCommitsResponse.commits = newCommitsResponse.commits.map(
            (commit) => {
              if (commit.id === commitId) {
                return {
                  ...commit,
                  state: COMMIT_STATE.REJECTED,
                };
              }
              return commit;
            }
          );

          return newCommitsResponse;
        }
      );

      setNotification({ type: 'success', message: response.message });
    },
    [projectId, setNotification, updateDataQuery]
  );

  const onCancelSuccess = useCallback(
    (response: { message: string }, commitId: string) => {
      updateDataQuery([projectId, 'commits'], (prev: CommitType[]) =>
        prev.map((commit) => {
          if (commit.id === commitId) {
            return {
              ...commit,
              state: COMMIT_STATE.CANCELED,
            };
          }
          return commit;
        })
      );

      setNotification({ type: 'success', message: response.message });
    },
    [projectId, setNotification, updateDataQuery]
  );

  const approve = useCallback(
    async ({ commitId }: Omit<ApproveCommitRequest, 'projectId'>) => {
      if (!projectId) {
        return;
      }

      const project = queryClient.getQueryData<ProjectType>([projectId]);

      const previousCommitId = project?.approvedCommitId;

      try {
        if (!isAdmin) {
          const isAllowed = await checkUserPermission();

          if (!isAllowed) {
            setNotification({
              type: 'error',
              message: 'You are no longer a collaborator on this project',
            });
            push('/projects');
            return;
          }
        }

        const response = await approveCommit({
          previousCommitId,
          projectId,
          commitId,
        });

        onApproveSuccess(response, previousCommitId);
        return response;
      } catch (error) {
        setNotification({
          type: 'error',
          message:
            error instanceof AxiosError ? error.message : 'Approve failed',
        });
      }
    },
    [
      checkUserPermission,
      isAdmin,
      onApproveSuccess,
      projectId,
      push,
      queryClient,
      setNotification,
    ]
  );

  const reject = useCallback(
    async ({ commitId }: { commitId: string }) => {
      if (!projectId) {
        return;
      }

      try {
        if (!isAdmin) {
          const isAllowed = await checkUserPermission();

          if (!isAllowed) {
            setNotification({
              type: 'error',
              message: 'You are no longer a collaborator on this project',
            });
            push('/projects');
            return;
          }
        }

        const response = await rejectCommit({
          commitId,
        });

        onRejectSuccess(response, commitId);
        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          setNotification({
            type: 'error',
            message: error.response?.data ?? 'Reject failed',
          });
        }
      }
    },
    [
      checkUserPermission,
      isAdmin,
      onRejectSuccess,
      projectId,
      push,
      setNotification,
    ]
  );

  const cancel = useCallback(
    async ({ commitId }: { commitId: string }) => {
      if (!projectId) {
        return;
      }

      try {
        if (!isAdmin) {
          const isAllowed = await checkUserPermission();

          if (!isAllowed) {
            setNotification({
              type: 'error',
              message: 'You are no longer a collaborator on this project',
            });
            push('/projects');
            return;
          }
        }

        const response = await cancelCommit({
          commitId,
        });

        onCancelSuccess(response, commitId);
        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          setNotification({
            type: 'error',
            message: error.response?.data ?? 'Cancel failed',
          });
        }
      }
    },
    [
      checkUserPermission,
      isAdmin,
      onCancelSuccess,
      projectId,
      push,
      setNotification,
    ]
  );

  const { mutate: handleApprove, isPending: isApproving } = useMutation({
    mutationFn: approve,
  });

  const { mutate: handleReject, isPending: isRejecting } = useMutation({
    mutationFn: reject,
  });

  const { mutate: handleCancel, isPending: isCanceling } = useMutation({
    mutationFn: cancel,
  });

  return {
    handleApprove,
    isApproving,
    handleReject,
    isRejecting,
    handleCancel,
    isCanceling,
  };
};
