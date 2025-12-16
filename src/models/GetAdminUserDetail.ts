import { ApiResponseCommon } from '@/types';
import { UserInfoAuth } from './users.model';

export type GetAdminUserDetailResponse = {
  data?: UserInfoAuth;
} & ApiResponseCommon;
