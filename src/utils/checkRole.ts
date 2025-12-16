import { getUserMetadata } from '@/services/user';
import { USER_RULE_TYPE } from '@/types';

export const handleCheckRole = async (uid: string) => {
  const userInfo = await getUserMetadata(uid);
  return userInfo?.rule === USER_RULE_TYPE.ADMIN;
};
