import { ApiResponseCommon } from '@/types';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UserMetadataType } from './UserMetadataType';

export type GetUserInfoResponse = {
  data?: UserMetadataType & DecodedIdToken;
} & ApiResponseCommon;
