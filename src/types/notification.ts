export type NotificationChannel = 'email' | 'slack' | 'browser';

export type NotificationEvent =
  | 'screenshot_completed'
  | 'screenshot_failed'
  | 'visual_diff_detected'
  | 'project_added'
  | 'commit_analyzed';

export type NotificationPreferences = {
  userId: string;
  channels: Record<NotificationChannel, boolean>;
  events: Record<NotificationEvent, boolean>;
  quietHours: {
    enabled: boolean;
    startHour: number;
    endHour: number;
    timezone: string;
  };
  slackWebhookUrl?: string;
  emailOverride?: string;
  updatedAt: string;
};

export type UpdateNotificationPreferencesRequest = {
  channels?: Partial<Record<NotificationChannel, boolean>>;
  events?: Partial<Record<NotificationEvent, boolean>>;
  quietHours?: Partial<NotificationPreferences['quietHours']>;
  slackWebhookUrl?: string;
  emailOverride?: string;
};

/**
 * Default notification preferences for new users.
 */
export const DEFAULT_NOTIFICATION_PREFERENCES: Omit<NotificationPreferences, 'userId' | 'updatedAt'> = {
  channels: {
    email: true,
    slack: false,
    browser: true,
  },
  events: {
    screenshot_completed: false,
    screenshot_failed: true,
    visual_diff_detected: true,
    project_added: false,
    commit_analyzed: false,
  },
  quietHours: {
    enabled: false,
    startHour: 22,
    endHour: 8,
    timezone: 'UTC',
  },
};

/**
 * Checks if a notification should be sent based on quiet hours.
 * Returns true if the notification is ALLOWED (not in quiet hours).
 */
export const isOutsideQuietHours = (prefs: NotificationPreferences): boolean => {
  if (!prefs.quietHours.enabled) return true;

  const now = new Date();
  const currentHour = now.getHours();
  const { startHour, endHour } = prefs.quietHours;

  // Handle wrapping (e.g. 22:00 - 08:00)
  if (startHour > endHour) {
    // Quiet hours span midnight
    return currentHour >= endHour && currentHour < startHour;
  }

  // Normal range (e.g. 09:00 - 17:00 means quiet FROM 9 TO 17)
  return currentHour < startHour || currentHour >= endHour;
};

/**
 * Validates that a Slack webhook URL is properly formatted.
 */
export const isValidSlackWebhookUrl = (url: string): boolean => {
  return url.startsWith('https://hooks.slack.com/services/');
};
