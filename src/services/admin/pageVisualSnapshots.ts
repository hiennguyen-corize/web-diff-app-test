import db from '@/configs/firebase';
import {
  GetVisualSnapshotsRequest,
  GetVisualSnapshotsResponse,
} from '@/models/GetVisualSnapshotsType';
import { handleIsProjectBelongToThisUser } from '@/utils/pageSnapshot';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getVisualSnapshots = async (
  request: GetVisualSnapshotsRequest
): Promise<GetVisualSnapshotsResponse> => {
  const { projectId, userId } = request;

  if (!userId) {
    throw new Error('Please login');
  }

  if (typeof projectId !== 'string' || typeof userId !== 'string') {
    throw new Error('Missing or empty info');
  }

  const isBelongTo = await handleIsProjectBelongToThisUser(projectId, userId);

  if (!isBelongTo) {
    throw new Error(`You don't have permission`);
  }

  const visualSnapshotsRef = collection(db, `/visualchecks`);

  const condition = query(
    visualSnapshotsRef,
    where('projectId', '==', projectId)
  );

  const visualSnapshotsSnap = await getDocs(condition);

  const visualSnapshotData = visualSnapshotsSnap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      path: data.path,
      status: data.status,
      createdAt: data.createdAt,
      updateAt: data.updateAt,
    };
  });

  return {
    message: 'Get page visual snapshot successfully',
    data: visualSnapshotData,
  };
};
