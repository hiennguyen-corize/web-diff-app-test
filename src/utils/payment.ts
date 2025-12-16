import { USER_PLANS_TYPE, USER_PLAN_NAME_TYPE } from '@/types';

export const isUserPlanType = (
  planName?: string
): planName is USER_PLAN_NAME_TYPE =>
  planName === USER_PLAN_NAME_TYPE.FREE ||
  planName === USER_PLAN_NAME_TYPE.PREMIUM ||
  planName === USER_PLAN_NAME_TYPE.ENTERPRISE;

export const isUserPlanIdType = (planId?: number): planId is USER_PLANS_TYPE =>
  planId === USER_PLANS_TYPE.FREE ||
  planId === USER_PLANS_TYPE.PREMIUM ||
  planId === USER_PLANS_TYPE.ENTERPRISE;
