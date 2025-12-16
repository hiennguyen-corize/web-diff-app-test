import db from '@/configs/firebase';
import { UserMetadataType } from '@/models/UserMetadataType';
import { UpdateUserTypeRequest } from '@/models/users.model';
import { UserType } from '@/types/user';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import config from '@/configs/env';
import { GetUserBasicInfoResponse } from '@/models/GetUserBasicInfoResponse';
import { UpdateUserTypeResponse } from '@/models/UpdateUserType';
import { USER_PLANS_TYPE, USER_RULE_TYPE } from '@/types';
import { httpClient } from '@/utils/httpClient';
/**
 * Login
 * @param data
 */
export type ResponseData = {
  data?: UserType;
  message: string;
};

export const addUserMeta = async (
  data: {
    userId: string;
    type: USER_PLANS_TYPE;
    rule: USER_RULE_TYPE;
  },
  uid: string
) => {
  const userMetaRef = doc(db, 'usermeta', uid);
  await setDoc(userMetaRef, {
    ...data,
    userId: uid,
  });

  const newUserMetaSnap = await getDoc(userMetaRef);
  const newUserMeta = newUserMetaSnap.data();
  return newUserMeta;
};

export const updateUserType = async ({
  type,
  uid,
}: UpdateUserTypeRequest): Promise<UpdateUserTypeResponse> => {
  const userMetadataRef = doc(db, `/usermeta/${uid}`);

  await updateDoc(userMetadataRef, {
    type,
  });

  return {
    message: 'Select type user is success',
  };
};

export const getUserMetadata = async (
  uid: string
): Promise<UserMetadataType | null> => {
  const userMetaRef = doc(db, `/usermeta/${uid}`);

  const userMetaSnap = await getDoc(userMetaRef);

  if (!userMetaSnap?.exists()) {
    return null;
  }

  const userData = userMetaSnap.data();

  const userMeta = {
    rule: userData.rule,
    userId: userData.userId,
    customerId: userData.customerId || null,
    screenshotCount: userData.screenshotCount,
  };

  return userMeta;
};

export const checkIsAdmin = async (uid: string): Promise<boolean> => {
  const userMeta = await getUserMetadata(uid);
  return userMeta?.rule === USER_RULE_TYPE.ADMIN;
};

export const getUserBasicInfo = async (
  email: string
): Promise<GetUserBasicInfoResponse> => {
  return httpClient.get(
    `${config.cloudFunctions.origin}/getUserBasicInfo/${email}`
  );
};
