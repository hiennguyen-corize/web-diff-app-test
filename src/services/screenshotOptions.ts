import db from '@/configs/firebase';
import {
  AddScreenshotOptionRequest,
  ScreenshotOptionType,
  UpdateScreenshotOptionRequest,
} from '@/models/ScreenshotOptionType';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const handleAddScreenshotOption = async (
  projectId: string,
  key: string,
  value: string
) => {
  if (!projectId) {
    throw new AxiosError('Missing or empty projectId');
  }

  const optionScreenshotsRef = collection(
    db,
    `/projects/${projectId}/optionScreenshots`
  );

  const q = query(optionScreenshotsRef, where('key', '==', key));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new AxiosError(`Key '${key}' already exists.`);
  }

  const newOptionScreenshot = {
    createdAt: dayjs().toISOString(),
    key,
    value,
  };

  const newOptionScreenshotDoc = await addDoc(
    optionScreenshotsRef,
    newOptionScreenshot
  );

  const optionScreenshotRef = doc(
    db,
    `/projects/${projectId}/optionScreenshots/${newOptionScreenshotDoc.id}`
  );

  const newSnapshot = await getDoc(optionScreenshotRef);

  if (!newSnapshot.exists()) {
    throw new AxiosError('Option screenshot not found');
  }

  return newSnapshot.data();
};

const handleUpdateScreenshotOption = async (
  projectId: string,
  optionScreenshotId: string,
  key: string,
  value: string
) => {
  if (!projectId || !optionScreenshotId) {
    return;
  }

  const optionScreenshotRef = doc(
    db,
    `/projects/${projectId}/optionScreenshots/${optionScreenshotId}`
  );

  const newSnapshot = await getDoc(optionScreenshotRef);

  if (!newSnapshot.exists()) {
    throw new AxiosError('Option screenshot not found');
  }

  await updateDoc(optionScreenshotRef, {
    updatedAt: dayjs().toISOString(),
    value: value,
    key: key,
  });
};

export const addScreenshotOption = async (
  projectId: string,
  options: AddScreenshotOptionRequest
) => {
  if (!options.length) {
    return;
  }

  const saveList = options.map((option) =>
    handleAddScreenshotOption(projectId, option.key, option.value)
  );

  const newOptionScreenshots = await Promise.all(saveList);

  return {
    message: 'Create options for screenshot success',
    data: newOptionScreenshots,
  };
};

export const getScreenshotOptions = async (projectId: string) => {
  if (!projectId) {
    throw new AxiosError('Missing or empty projectId');
  }

  const optionScreenshotsRef = collection(
    db,
    `/projects/${projectId}/optionScreenshots`
  );

  const q = query(optionScreenshotsRef, orderBy('createdAt'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      message: 'Get options for screenshot success',
      data: [],
    };
  }

  const optionScreenshots: ScreenshotOptionType[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      key: data.key,
      value: data.value,
      createdAt: data.createdAt,
    };
  });

  return {
    message: 'Get options for screenshot success',
    data: optionScreenshots,
  };
};

export const deleteOptionsScreenshot = async (
  projectId: string,
  deleteOptionIds: string[]
) => {
  if (!deleteOptionIds.length) {
    return;
  }

  const optionScreenshotsRef = collection(
    db,
    `/projects/${projectId}/optionScreenshots`
  );

  const deleteList = deleteOptionIds.map((id) =>
    deleteDoc(doc(optionScreenshotsRef, id))
  );
  await Promise.all(deleteList);

  return {
    message: 'Delete options for screenshot success',
  };
};

export const updateManyOptionsScreenshot = async (
  projectId: string,
  options: UpdateScreenshotOptionRequest
) => {
  if (!options.length) {
    return;
  }

  const updateList = options.map((option) =>
    handleUpdateScreenshotOption(projectId, option.id, option.key, option.value)
  );

  await Promise.all(updateList);

  return {
    message: 'Update options for screenshot success',
  };
};
