import config from '@/configs/env';
import db from '@/configs/firebase';
import {
  CreatePageSnapshotResponse,
  CreatePageSnapshotsBySitemapRequest,
  CreatePageSnapshotsBySitemapResponse,
} from '@/models/CreatePageSnapshot';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { httpClient } from '@/utils/httpClient';
import { handleIsPageSnapshotExist } from '@/utils/pageSnapshot';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';

type pageSnapShotData = {
  projectId: string;
  baseInfo: string[];
  status?: SCREENSHOT_STATUS_TYPE;
};

const handleAddNewPageSnapshot = async (
  projectId: string,
  baseUrl: string
): Promise<PageSnapShotType> => {
  const pageSnapshotsRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  const oneNew = {
    createdAt: dayjs().toISOString(),
    url: baseUrl,
  };

  const newPageSnapshotSnap = await addDoc(pageSnapshotsRef, oneNew);

  const pageSnapshotRef = doc(
    db,
    `/projects/${projectId}/pageSnapShot/${newPageSnapshotSnap.id}`
  );
  const newPageSnapshotDoc = await getDoc(pageSnapshotRef);

  if (!newPageSnapshotDoc.exists()) {
    throw new AxiosError('New Page Snapshot not found');
  }

  const newPageSnapshot = newPageSnapshotDoc.data();

  return {
    id: newPageSnapshotDoc.id,
    url: newPageSnapshot.url,
    createdAt: newPageSnapshot.createdAt,
  };
};

export const addPageSnapShot = async (
  request: pageSnapShotData
): Promise<CreatePageSnapshotResponse> => {
  const { projectId, baseInfo: newPageSnapBaseUrls } = request;

  if (!projectId || !newPageSnapBaseUrls.length) {
    throw new AxiosError('Missing or empty info');
  }

  const conditionArray: Promise<boolean>[] = [];

  newPageSnapBaseUrls.forEach((newPageSnapBaseUrl: string) => {
    conditionArray.push(
      handleIsPageSnapshotExist(projectId, newPageSnapBaseUrl)
    );
  });

  const conditions = await Promise.all(conditionArray);

  if (conditions.some((isExist) => isExist)) {
    throw new AxiosError('Error! Url is exist');
  }

  const newPageSnapshots = await Promise.all(
    newPageSnapBaseUrls.map((newPageSnapBaseUrl: string) =>
      handleAddNewPageSnapshot(projectId, newPageSnapBaseUrl)
    )
  );

  return {
    message: 'Create page snapshot success',
    data: newPageSnapshots,
  };
};

export const deletePageSnapShot = async (
  projectId: string,
  pageSnapShotId: string
): Promise<void> => {
  const pagesnapshottDoc = doc(
    db,
    `/projects/${projectId}/pageSnapShot/${pageSnapShotId}`
  );
  await deleteDoc(pagesnapshottDoc);
};

export const getPageSnapshot = async (
  projectId: string,
  pageSnapshotId: string
): Promise<PageSnapShotType | undefined> => {
  const pageSnapshotRef = doc(
    db,
    `/projects/${projectId}/pageSnapShot/${pageSnapshotId}`
  );

  const pageSnapshotSnap = await getDoc(pageSnapshotRef);

  const data = pageSnapshotSnap.data();

  if (!pageSnapshotSnap?.exists() || !data) {
    return;
  }

  return {
    url: data.url,
    id: pageSnapshotSnap.id,
    createdAt: data.createdAt,
  };
};

export const addPageSnapshotsBySitemap = async (
  request: CreatePageSnapshotsBySitemapRequest
): Promise<CreatePageSnapshotsBySitemapResponse> => {
  return httpClient.post(
    `${config.cloudFunctions.origin}/createPageSnapshotsBySitemap`,
    request
  );
};
