import config from '@/configs/env';
import db from '@/configs/firebase';
import {
  CreateCommitDocsRequest,
  CreateCommitDocsResponse,
} from '@/models/CreateCommitDocsType';
import {
  ChecksumComparisonType,
  ChecksumPartType,
  CommitType,
  SizePathsType,
} from '@/models/GetCommitsType';
import { COMMIT_STATE, SCREENSHOT_STATUS_TYPE } from '@/types';
import { updateFieldsInObject } from '@/utils/updateFieldsInObject';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import pLimit from 'p-limit';
import { getCommit } from './commit';

const limit = pLimit(5);

type PageSnapUrlType = {
  id: string;
  url: string;
  compareFrom: SizePathsType | null;
  checksumComparisonFrom: ChecksumPartType | null;
};

const resultDefault = {
  desktop: false,
  tablet: false,
  mobile: false,
};

export const createVisualSnapshotDocs = async (
  request: CreateCommitDocsRequest
): Promise<CreateCommitDocsResponse> => {
  const { userId, projectId, pageSnapshotLength, dateOrder } = request;

  if (!userId || !projectId) {
    throw new Error('Bad request');
  }

  const newCommit = {
    userId,
    fail: 0,
    projectId,
    dateOrder,
    success: 0,
    state: COMMIT_STATE.IDLE,
    totalPages: pageSnapshotLength,
    createdAt: dayjs().toISOString(),
    status: SCREENSHOT_STATUS_TYPE.pending,
  };

  const visualChecksRef = collection(db, `/visualchecks`);
  const { id: commitId } = await addDoc(visualChecksRef, newCommit);

  if (!commitId) {
    throw new AxiosError('commitId not found');
  }

  const projectRef = doc(db, `/projects/${projectId}`);

  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw new AxiosError('Project not found');
  }

  const projectDetail = projectSnap.data();

  await handleAddPageSnapshotsToNewCommit(
    projectDetail.approvedCommitId,
    projectId,
    commitId
  );

  const commit: CommitType = await getCommit({
    projectId,
    commitId,
  });

  return { message: 'success', data: commit };
};

const handleAddPageSnapshotsToNewCommit = async (
  approvedCommitId: string,
  projectId: string,
  commitId: string
) => {
  const commitPagesSnapshotsRef = collection(
    db,
    `/visualchecks/${commitId}/pageSnapshots`
  );

  const basePagesSnapshots = await getBasePagesSnapshotsUrl(projectId);

  const approvedCommitPagesSnapshots =
    await getApprovedCommitPagesSnapshotsUrl(approvedCommitId);

  const pagesSnapshotsObject = updateFieldsInObject(
    basePagesSnapshots,
    approvedCommitPagesSnapshots ?? {}
  );

  const pageSnapshots = Object.values(pagesSnapshotsObject);

  const promises = pageSnapshots.map((commitPageSnapshot) => {
    const checksumComparison = {
      from: commitPageSnapshot.checksumComparisonFrom,
      result: resultDefault,
      to: null,
    };

    const payload: {
      checksumComparison: ChecksumComparisonType | null;
      screenshot: { compareFrom: SizePathsType | null };
      status: SCREENSHOT_STATUS_TYPE;
      totalPages: number;
      projectId: string;
      createdAt: string;
      url: string;
    } = {
      createdAt: dayjs().toISOString(),
      screenshot: { compareFrom: commitPageSnapshot.compareFrom ?? null },
      status: SCREENSHOT_STATUS_TYPE.pending,
      totalPages: pageSnapshots.length,
      url: commitPageSnapshot.url,
      checksumComparison,
      projectId,
    };

    return limit(() => addDoc(commitPagesSnapshotsRef, payload));
  });
  await Promise.all(promises);
};

export const screenshotVisualTest = (
  commitId: string,
  projectId: string,
  uid: string
) => {
  return axios.post(`${config.cloudFunctions.origin}/enqueue`, {
    projectId,
    commitId,
    uid,
  });
};

const getBasePagesSnapshotsUrl = async (projectId: string) => {
  const basePagesSnapshotsRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  const basePageSnapsSnap = await getDocs(basePagesSnapshotsRef);
  const basePageSnapshotsObject = handleSnapshots(basePageSnapsSnap.docs);
  return basePageSnapshotsObject;
};

const getApprovedCommitPagesSnapshotsUrl = async (commitId?: string) => {
  if (!commitId) {
    return;
  }

  const approvedCommitPagesSnapshotsRef = collection(
    db,
    `/visualchecks/${commitId}/pageSnapshots`
  );
  const approvedCommitPageSnapshotsSnap = await getDocs(
    approvedCommitPagesSnapshotsRef
  );
  const approvedCommitSnapshotsObject = handleSnapshots(
    approvedCommitPageSnapshotsSnap.docs
  );
  return approvedCommitSnapshotsObject;
};

const handleSnapshots = (
  docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]
): Record<string, PageSnapUrlType> => {
  const snaps: Record<string, PageSnapUrlType> = {};

  docs.forEach((doc) => {
    const data = doc.data();
    const url = data.url;
    const compareFrom: SizePathsType = data.screenshot?.compareTo;

    snaps[url] = {
      checksumComparisonFrom: data.checksumComparison?.to || null,
      compareFrom,
      id: doc.id,
      url,
    };
  });

  return snaps;
};
