import { PageVisualSnapShot } from './pageVisualSnapshot.model';

export type GetVisualSnapshotsRequest = {
  userId: string;
  projectId: string;
};

export type GetVisualSnapshotsResponse = {
  data: PageVisualSnapShot[];
  message: string;
};
