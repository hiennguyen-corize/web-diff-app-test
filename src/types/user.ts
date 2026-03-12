export type UserType = {
  userId: string;
  type: number;
  status: number;
  rule: number;
  displayName?: string;
  email?: string;
  lastLoginAt?: string;
};

export type UserStatus = "active" | "inactive" | "suspended";

/**
 * Maps numeric status code to a string status label.
 */
export const getUserStatus = (status: number): UserStatus => {
  switch (status) {
    case 1:
      return "active";
    case 2:
      return "inactive";
    default:
      return "suspended";
  }
};

/**
 * Checks if user account is in an active state.
 */
export const isActiveUser = (user: UserType): boolean => {
  return user.status === 1 && user.userId.length > 0;
};
