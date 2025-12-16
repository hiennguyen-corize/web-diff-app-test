import config from '@/configs/env';
import { AdminUpdateUserResponse } from '@/models/AdminUpdateUser';
import { DeleteAdminUserResponse } from '@/models/DeleteAdminUser';
import { GetAdminUserDetailResponse } from '@/models/GetAdminUserDetail';
import { GetAdminUsersResponse } from '@/models/GetAdminUsers';
import { UpdateUserRequest } from '@/models/users.model';
import { httpClient } from '@/utils/httpClient';

export const listAllUser = async (
  userId: string,
  signal: AbortSignal
): Promise<GetAdminUsersResponse> => {
  return httpClient.get(
    `${config.cloudFunctions.origin}/getUsers`,
    {
      userId,
    },
    { signal }
  );
};

export const getUserDetail = (
  userId: string
): Promise<GetAdminUserDetailResponse> => {
  return httpClient.get(
    `${config.cloudFunctions.origin}/getUserById/${userId}`
  );
};

export const updateUserInfo = (
  updateData: UpdateUserRequest,
  uid: string
): Promise<AdminUpdateUserResponse> => {
  return httpClient.put(
    `${config.cloudFunctions.origin}/updateUserById/${updateData.uid}`,
    { ...updateData, uid }
  );
};

export const deleteUserInfo = (
  userId: string,
  adminId: string
): Promise<DeleteAdminUserResponse> => {
  return httpClient.delete(
    `${config.cloudFunctions.origin}/deleteUserById/${userId}`,
    { adminId }
  );
};
