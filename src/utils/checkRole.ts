import { getUserMetadata } from '@/services/user';
import { USER_RULE_TYPE } from '@/types';

export const handleCheckRole = async (uid: string) => {
  const userInfo = await getUserMetadata(uid);
  return userInfo?.rule === USER_RULE_TYPE.ADMIN;
};
// webhook test 1 - Thu Mar 12 08:57:30 +07 2026
