import { CommitType } from './GetCommitsType';

export type CreateCommitDocsRequest = {
  pageSnapshotLength: number;
  dateOrder: number;
  projectId: string;
  userId: string;
};

export type CreateCommitDocsResponse = {
  message: string;
  data: CommitType;
};

export type CheckTaskResponse = {
  message: string;
  data: boolean | string;
};
export type CheckTaskRequest = {
  visualId: string;
};
