import db from '@/configs/firebase';
import { handleIsProjectBelongToThisUser } from '@/utils/pageSnapshot';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';

type DeleteVisualSnapshotRequest = {
  projectId: string;
  pageSnapshotId: string;
  visualSnapshotId: string;
};

export const deleteVisualSnapshot = async (
  payload: DeleteVisualSnapshotRequest,
  userId: string
) => {
  const { projectId, pageSnapshotId, visualSnapshotId } = payload;

  if (!projectId || !pageSnapshotId || !visualSnapshotId || !userId) {
    throw new Error('Bad request');
  }

  const isBelong = handleIsProjectBelongToThisUser(projectId, userId);

  if (!isBelong) {
    throw new Error('Can not delete because this project not belong to you');
  }

  const visualSnapshotRef = doc(
    db,
    `/projects/${projectId}/pageSnapShot/${pageSnapshotId}/pageVisualSnapShot/${visualSnapshotId}`
  );

  const visualSnapshot = (await getDoc(visualSnapshotRef)).data();

  if (!!visualSnapshot?.reference) {
    await deleteDoc(visualSnapshotRef);
  }
};
