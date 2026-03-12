/**
 * User role constants.
 * Maps numeric role codes to human-readable labels.
 */
export const USER_ROLES = {
  VIEWER: 0,
  EDITOR: 1,
  ADMIN: 2,
  SUPER_ADMIN: 3,
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.VIEWER]: "Viewer",
  [USER_ROLES.EDITOR]: "Editor",
  [USER_ROLES.ADMIN]: "Admin",
  [USER_ROLES.SUPER_ADMIN]: "Super Admin",
};

/**
 * Checks if the given role has admin-level privileges.
 */
export const isAdminRole = (role: UserRole): boolean => {
  return role >= USER_ROLES.ADMIN;
};

/**
 * Checks if a user has permission to perform an action based on minimum required role.
 */
export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  return userRole >= requiredRole;
};

/**
 * Returns a human-readable label for a numeric role.
 * Falls back to "Unknown" for unrecognized role codes.
 */
export const getRoleLabel = (role: number): string => {
  return ROLE_LABELS[role as UserRole] ?? "Unknown";
};
