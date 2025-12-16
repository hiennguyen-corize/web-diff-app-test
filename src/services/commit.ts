import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import db from '@/configs/firebase';
import {
  ApproveCommitRequest,
  ApproveCommitResponse,
} from '@/models/ApproveCommit';
import { GetCommitRequest } from '@/models/Commit';
import { GetCommitPageSnapshotRequest } from '@/models/CommitPageSnapshot';
import { DeleteCommitRequest } from '@/models/DeleteCommitType';
import { CommitPageSnapshotType, CommitType } from '@/models/GetCommitsType';
import { COMMIT_STATE, SCREENSHOT_STATUS_TYPE } from '@/types';
import { deleteCollection } from '@/utils/firebase';
import { handleIsProjectBelongToThisUser } from '@/utils/pageSnapshot';
import { AxiosError } from 'axios';

export const deleteCommit = async ({
  projectId,
  commitId,
  userId,
}: DeleteCommitRequest) => {
  try {
    if (!userId) {
      throw new Error('Missing or empty userId');
    }

    const isBelong = await handleIsProjectBelongToThisUser(projectId, userId);

    if (!isBelong) {
      throw new Error('You are not allow to edit on this project');
    }

    const commitRef = doc(db, `/visualchecks/${commitId}`);
    const projectRef = doc(db, `/projects/${projectId}`);

    const commitPageSnapRef = collection(
      db,
      `/visualchecks/${commitId}/pageSnapshots`
    );

    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      throw new Error('Project not found');
    }

    const project = projectSnap.data();

    if (project.approvedCommitId === commitId) {
      updateDoc(projectRef, { approvedCommitId: deleteField() });
    }

    await Promise.all([
      deleteDoc(commitRef),
      deleteCollection(commitPageSnapRef),
    ]);
    return { message: 'Ok' };
  } catch (error) {
    throw error;
  }
};

export const approveCommit = async (
  request: ApproveCommitRequest
): Promise<ApproveCommitResponse> => {
  const { projectId, commitId, previousCommitId } = request;

  if (!projectId || !commitId) {
    throw new AxiosError('Bad request');
  }

  const commitPageSnapRef = doc(db, `/projects/${projectId}`);

  const approveCommitRef = doc(db, `/visualchecks/${commitId}`);

  await Promise.all([
    updateDoc(approveCommitRef, { state: COMMIT_STATE.APPROVED }),
    updateDoc(commitPageSnapRef, { approvedCommitId: commitId }),
    handlePreviousApprovedCommit(previousCommitId),
  ]);

  return {
    message: 'Approve commit successfully',
    data: {
      approvedCommitId: commitId,
    },
  };
};

const handlePreviousApprovedCommit = async (previousCommitId?: string) => {
  if (!previousCommitId) {
    return;
  }
  const previousApprovedCommitRef = doc(
    db,
    `/visualchecks/${previousCommitId}`
  );

  await updateDoc(previousApprovedCommitRef, { state: COMMIT_STATE.REJECTED });
};

export const rejectCommit = async ({ commitId }: { commitId: string }) => {
  if (!commitId) {
    throw new AxiosError('Bad request');
  }

  const commitPageSnapRef = doc(db, `/visualchecks/${commitId}`);
  await updateDoc(commitPageSnapRef, { state: COMMIT_STATE.REJECTED });

  return {
    message: 'Reject commit successfully',
  };
};

export const cancelCommit = async ({ commitId }: { commitId: string }) => {
  if (!commitId) {
    throw new AxiosError('Bad request');
  }

  const commitPageSnapRef = doc(db, `/visualchecks/${commitId}`);
  await updateDoc(commitPageSnapRef, { state: COMMIT_STATE.CANCELED });

  return {
    message: 'Cancel commit successfully',
  };
};

export const getCommitPageSnapshot = async ({
  pageSnapshotId,
  projectId,
  commitId,
  userId,
}: GetCommitPageSnapshotRequest): Promise<CommitPageSnapshotType> => {
  try {
    if (!projectId || !commitId || !pageSnapshotId || !userId) {
      throw new Error('Bad request');
    }

    const isBelong = await handleIsProjectBelongToThisUser(projectId, userId);

    if (!isBelong) {
      throw new Error('You are not allow to edit on this project');
    }

    const pageSnapshotRef = doc(
      db,
      `/visualchecks/${commitId}/pageSnapshots/${pageSnapshotId}`
    );

    const commitPageSnapshotSnap = await getDoc(pageSnapshotRef);

    if (!commitPageSnapshotSnap.exists()) {
      throw new Error('Commit not found');
    }

    const commitData = commitPageSnapshotSnap.data();

    const commit: CommitPageSnapshotType = {
      id: commitPageSnapshotSnap.id,
      url: commitData.url,
      projectId: commitData.projectId,
      totalPages: commitData.totalPages,
      screenshot: commitData.screenshot,
      status: commitData.status,
      errorMessage: commitData.errorMessage,
      createdAt: commitData.createdAt,
      checksumComparison: commitData.checksumComparison,
    };

    return commit;
  } catch (error) {
    throw error;
  }
};

export const getCommit = async ({
  projectId,
  commitId,
}: GetCommitRequest): Promise<CommitType> => {
  try {
    if (typeof projectId !== 'string' || !commitId) {
      throw new AxiosError('Bad request');
    }

    const commitRef = doc(db, `/visualchecks/${commitId}`);

    const commitPageSnapRef = collection(
      db,
      `/visualchecks/${commitId}/pageSnapshots`
    );

    const commitSnap = await getDoc(commitRef);

    if (!commitSnap.exists()) {
      throw new AxiosError('Commit not found');
    }

    const commitData = commitSnap.data();

    const commit: CommitType = {
      id: commitSnap.id,
      fail: commitData.fail,
      state: commitData.state,
      userId: commitData.userId,
      status: commitData.status,
      success: commitData.success,
      dateOrder: commitData.dateOrder,
      createdAt: commitData.createdAt,
      projectId: commitData.projectId,
      totalPages: commitData.totalPages,
      finishedAt: commitData.finishedAt,
      pageSnapshots: commitData.pageSnapshots,
    };

    const pageSnapsSnap = await getDocs(commitPageSnapRef);

    const pageSnaps: CommitPageSnapshotType[] = pageSnapsSnap.docs.map(
      (doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          url: data.url,
          status: data.status,
          createdAt: data.createdAt,
          projectId: data.projectId,
          screenshot: data.screenshot,
          totalPages: data.totalPages,
          errorMessage: data.errorMessage,
          checksumComparison: data.checksumComparison,
        };
      }
    );

    commit.pageSnapshots = pageSnaps;

    return commit;
  } catch (error) {
    throw error;
  }
};

export const handlePassCommit = async ({
  commitId,
  pageSnapshotId,
}: {
  commitId: string;
  pageSnapshotId: string;
}) => {
  if (!commitId) {
    return;
  }
  const commitPageSnapRef = doc(
    db,
    `visualchecks/${commitId}/pageSnapshots/${pageSnapshotId}`
  );

  await updateDoc(commitPageSnapRef, { status: SCREENSHOT_STATUS_TYPE.pass });

  return {
    message: 'Update commit success',
  };
};

export const handleFailCommit = async ({
  commitId,
  pageSnapshotId,
}: {
  commitId: string;
  pageSnapshotId: string;
}) => {
  if (!commitId) {
    return;
  }
  const commitPageSnapRef = doc(
    db,
    `visualchecks/${commitId}/pageSnapshots/${pageSnapshotId}`
  );

  await updateDoc(commitPageSnapRef, { status: SCREENSHOT_STATUS_TYPE.fail });

  return {
    message: 'Update commit success',
  };
};
