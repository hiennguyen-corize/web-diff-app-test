import { ApiResponseCommon } from '@/types';
import { UserRecord } from 'firebase-admin/auth';

export type GetUserByEmailResponse = {
  data?: UserRecord;
} & ApiResponseCommon;
