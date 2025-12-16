export type GetUserBasicInfoResponse = {
  data?: UserBasicType;
  message: string;
};

export type UserBasicType = {
  email: string;
  displayName?: string;
  photoURL?: string;
};
