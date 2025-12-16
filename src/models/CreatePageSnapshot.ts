import { ApiResponseCommon } from '@/types';
import { PageSnapShotType } from './pageSnapShot.model';

export type CreatePageSnapshotResponse = {
  data?: PageSnapShotType[];
} & ApiResponseCommon;

export type CreatePageSnapshotsBySitemapRequest = {
  projectId: string;
  sitemapUrl: string;
};

export type CreatePageSnapshotsBySitemapResponse = {
  data?: PageSnapShotType[];
} & ApiResponseCommon;
