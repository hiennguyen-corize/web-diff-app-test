import { ApiResponseCommon, USER_RULE_TYPE } from '@/types';
import { UserInfoAuth } from './users.model';

export type DataListUser = {
  userMeta: {
    userId: string;
    rule: USER_RULE_TYPE;
    type: number;
  };
  userRecord: UserInfoAuth;
};

export type GetAdminUsersResponse = {
  data: DataListUser[];
} & ApiResponseCommon;
