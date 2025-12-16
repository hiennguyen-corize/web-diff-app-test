export type ScreenshotPageRequest = {
  uid: string;
  projectId: string;
  pageSnapshotId: string;
};

export type ScreenshotPageResponse = {
  message: string;
  url?: string;
};
