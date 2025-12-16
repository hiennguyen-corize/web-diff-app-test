import { COMMIT_STATE, SCREENSHOT_STATUS_TYPE } from '@/types';

export type GetCommitsRequestType = {
  projectId: string;
  storageTime: number;
};

export type GetCommitResponseType = {
  message: string;
  data: CommitType[];
  hasMore: boolean;
};

export type CommitType = {
  id: string;
  fail: number;
  userId: string;
  success: number;
  dateOrder: number;
  projectId: string;
  totalPages: number;
  createdAt?: string;
  state: COMMIT_STATE;
  finishedAt?: string;
  status?: SCREENSHOT_STATUS_TYPE;
  pageSnapshots: CommitPageSnapshotType[];
};

export type SizePathsType = {
  imagePaths: PathsType;
  screenshotExeTimeSeconds: number;
};

export type CommitStatusType = {
  desktop: SCREENSHOT_STATUS_TYPE;
  tablet: SCREENSHOT_STATUS_TYPE;
  mobile: SCREENSHOT_STATUS_TYPE;
};

export type CommitPageSnapshotType = {
  id: string;
  url: string;
  projectId: string;
  createdAt: string;
  totalPages: number;
  status: CommitStatusType;
  screenshot: ScreenshotType;
  errorMessage: string | null;
  checksumComparison: ChecksumComparisonType | null;
};

export type ScreenshotType = {
  compareFrom: SizePathsType | null;
  compareTo: SizePathsType;
  comparedImages: PageSnapComparedImagesType;
};

export type ChecksumPartType = {
  desktop: string;
  tablet: string;
  mobile: string;
};

export type ChecksumResultType = {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
};

export type ChecksumComparisonType = {
  from: ChecksumPartType | null;
  to: ChecksumPartType | null;
  result: ChecksumResultType;
};

export type PathsType = {
  desktop: string;
  tablet: string;
  mobile: string;
};

type PageSnapComparedImageType = {
  url: string;
  matchPercent: number;
};

export type PageSnapComparedImagesType = {
  desktop: PageSnapComparedImageType;
  tablet: PageSnapComparedImageType;
  mobile: PageSnapComparedImageType;
};
