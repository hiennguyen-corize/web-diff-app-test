import db from '@/configs/firebase';
import {
  CommitPageSnapshotType,
  CommitType,
  GetCommitResponseType,
  GetCommitsRequestType,
} from '@/models/GetCommitsType';
import dayjs from 'dayjs';
import {
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  where,
} from 'firebase/firestore';

export const getCommits = async (
  request: GetCommitsRequestType
): Promise<GetCommitResponseType> => {
  try {
    const { projectId, storageTime } = request;

    const commitsRef = collection(db, 'visualchecks');
    const storageTimeDate = dayjs()
      .subtract(storageTime, 'months')
      .toISOString();

    const payload: (QueryFieldFilterConstraint | QueryOrderByConstraint)[] = [
      where('projectId', '==', projectId),
      where('createdAt', '>=', storageTimeDate),
      orderBy('createdAt', 'desc'),
    ];

    const q = query(commitsRef, ...payload);

    const commitsSnap = await getDocs(q);

    const commits: CommitType[] = [];

    for (const doc of commitsSnap.docs) {
      const data = doc.data();

      const commitPageSnapsRef = collection(
        db,
        `/visualchecks/${doc.id}/pageSnapshots`
      );

      const commitPageSnapsSnap = await getDocs(commitPageSnapsRef);

      const pageSnapshots: CommitPageSnapshotType[] =
        commitPageSnapsSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            url: data.url,
            status: data.status,
            projectId: data.projectId,
            createdAt: data.createdAt,
            screenshot: data.screenshot,
            totalPages: data.totalPages,
            errorMessage: data.errorMessage,
            checksumComparison: data.checksumComparison,
          };
        });

      commits.push({
        id: doc.id,
        pageSnapshots,
        fail: data.fail,
        state: data.state,
        status: data.status,
        userId: data.userId,
        success: data.success,
        projectId: data.projectId,
        dateOrder: data.dateOrder,
        createdAt: data.createdAt,
        totalPages: data.totalPages,
        finishedAt: data.finishedAt,
      });
    }

    const hasMore = await commitsHasMore(
      commitsRef,
      projectId,
      storageTimeDate
    );

    return {
      message: 'Get commit list successfully',
      data: commits,
      hasMore,
    };
  } catch (error) {
    throw error;
  }
};

const commitsHasMore = async (
  commitsRef: CollectionReference<DocumentData, DocumentData>,
  projectId: string,
  storageTimeDate: string
) => {
  const payload: (
    | QueryFieldFilterConstraint
    | QueryOrderByConstraint
    | QueryLimitConstraint
  )[] = [
    where('projectId', '==', projectId),
    where('createdAt', '<', storageTimeDate),
    orderBy('createdAt', 'desc'),
    limit(1),
  ];

  const q = query(commitsRef, ...payload);
  const commitsSnap = await getDocs(q);
  return !!commitsSnap.size;
};
