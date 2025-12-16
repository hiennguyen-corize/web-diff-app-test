export type PageSnapShotType = {
  id?: string;
  path?: string;
  url: string;
  createdAt?: string;
  updateAt?: string;
  isPagePrivate?: boolean;
};

export type ProjectType = {
  id: string;
  userId: string;
  name: string;
  description: string;
  hasPageLogin?: boolean;
  urlLogin?: string;
  userNameLogin?: string;
  passwordLogin?: string;
  hasBasicAuth?: boolean;
  userNameBasicAuth?: string;
  passwordBasicAuth?: string;
  createdAt?: string;
  updatedAt?: string;
  pageSnapShot?: PageSnapShotType[];
};

export type Page = {
  path: string;
  projectId: string;
};

export type CreatePagePayload = Pick<Page, 'path' | 'projectId'>;

export type SnapshotQueueDoc = {
  userId: string;
  projectId: string;
  createdAt: string;
};
