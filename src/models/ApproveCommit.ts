export type ApproveCommitRequest = {
  previousCommitId?: string;
  projectId: string;
  commitId: string;
};

export type ApproveCommitResponse = {
  message: string;
  data: ApproveCommitType;
};

export type ApproveCommitType = {
  approvedCommitId: string;
};
