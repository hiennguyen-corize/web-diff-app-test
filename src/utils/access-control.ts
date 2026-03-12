import { type UserType, isActiveUser } from "../types/user";
import { hasPermission, USER_ROLES, getRoleLabel, type UserRole } from "./roles";

export type AccessCheckResult = {
  allowed: boolean;
  reason: string;
  userRole: string;
};

/**
 * Performs a full access check for a user against a required permission level.
 * Validates user status, then checks role-based permission.
 *
 * @param user - The user object to validate
 * @param requiredRole - Minimum role needed for access
 * @returns Result object with allowed status and reason
 */
export const checkAccess = (
  user: UserType,
  requiredRole: UserRole,
): AccessCheckResult => {
  const userRoleLabel = getRoleLabel(user.rule);

  if (!isActiveUser(user)) {
    return {
      allowed: false,
      reason: "User account is not active",
      userRole: userRoleLabel,
    };
  }

  const allowed = hasPermission(user.rule as UserRole, requiredRole);

  return {
    allowed,
    reason: allowed
      ? `Access granted (${userRoleLabel})`
      : `Insufficient permissions: requires ${getRoleLabel(requiredRole)}, has ${userRoleLabel}`,
    userRole: userRoleLabel,
  };
};

/**
 * Convenience function to check admin access.
 */
export const requireAdmin = (user: UserType): AccessCheckResult => {
  return checkAccess(user, USER_ROLES.ADMIN);
};
