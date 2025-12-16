export type BasicAuthType = {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type BasicAuthRequest = {
  username: string;
  password: string;
};

export type BasicAuthResponse = {
  message: string;
  data: BasicAuthType | null;
};
