import db from '@/configs/firebase';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { some } from 'lodash';

export const handleIsProjectBelongToThisUser = async (
  projectId: string,
  userId: string
) => {
  try {
    const projectRef = doc(db, `/projects/${projectId}`);
    const project = (await getDoc(projectRef)).data();
    return project?.userId === userId;
  } catch (error) {
    return false;
  }
};

export const handleIsPageSnapshotExist = async (
  projectId: string,
  newPageSnapBaseUrl: string
) => {
  const pageSnapShotsRef = collection(
    db,
    `/projects/${projectId}/pageSnapShot`
  );

  try {
    const allPageSnapshotsSnap = await getDocs(pageSnapShotsRef);
    const allPageSnapshots = allPageSnapshotsSnap.docs.map((doc) => doc.data());

    return some(
      allPageSnapshots,
      (snapshot: PageSnapShotType) => snapshot.url === newPageSnapBaseUrl
    );
  } catch (error) {
    return true;
  }
};
