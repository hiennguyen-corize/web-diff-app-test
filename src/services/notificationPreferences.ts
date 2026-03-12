import db from '@/configs/firebase';
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  isValidSlackWebhookUrl,
  type NotificationPreferences,
  type UpdateNotificationPreferencesRequest,
} from '@/types/notification';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const COLLECTION = 'notification_preferences';

/**
 * Fetches user notification preferences from Firestore.
 * Returns default preferences if the user has not configured any.
 */
export const getNotificationPreferences = async (
  userId: string
): Promise<NotificationPreferences> => {
  const prefRef = doc(db, COLLECTION, userId);
  const snapshot = await getDoc(prefRef);

  if (!snapshot.exists()) {
    // Create default preferences for first-time users
    const defaults: NotificationPreferences = {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
      userId,
      updatedAt: new Date().toISOString(),
    };

    await setDoc(prefRef, defaults);
    return defaults;
  }

  return snapshot.data() as NotificationPreferences;
};

/**
 * Updates user notification preferences.
 * Merges the provided fields with existing preferences.
 */
export const updateNotificationPreferences = async (
  userId: string,
  updates: UpdateNotificationPreferencesRequest
): Promise<NotificationPreferences> => {
  // Validate Slack webhook URL if provided
  if (updates.slackWebhookUrl && !isValidSlackWebhookUrl(updates.slackWebhookUrl)) {
    throw new Error('Invalid Slack webhook URL format');
  }

  const prefRef = doc(db, COLLECTION, userId);
  const existing = await getNotificationPreferences(userId);

  // Deep merge channels and events
  const merged: Partial<NotificationPreferences> = {
    updatedAt: new Date().toISOString(),
  };

  if (updates.channels) {
    merged.channels = { ...existing.channels, ...updates.channels };
  }

  if (updates.events) {
    merged.events = { ...existing.events, ...updates.events };
  }

  if (updates.quietHours) {
    merged.quietHours = { ...existing.quietHours, ...updates.quietHours };
  }

  if (updates.slackWebhookUrl !== undefined) {
    merged.slackWebhookUrl = updates.slackWebhookUrl;
  }

  if (updates.emailOverride !== undefined) {
    merged.emailOverride = updates.emailOverride;
  }

  await updateDoc(prefRef, merged);

  return { ...existing, ...merged } as NotificationPreferences;
};

/**
 * Checks if a notification should be dispatched for a given event and channel.
 */
export const shouldNotify = async (
  userId: string,
  event: string,
  channel: string
): Promise<boolean> => {
  const prefs = await getNotificationPreferences(userId);

  // Check if channel is enabled
  const channelEnabled = prefs.channels[channel as keyof typeof prefs.channels];
  if (!channelEnabled) return false;

  // Check if event is enabled
  const eventEnabled = prefs.events[event as keyof typeof prefs.events];
  if (!eventEnabled) return false;

  return true;
};

/**
 * Resets notification preferences to defaults.
 */
export const resetNotificationPreferences = async (
  userId: string
): Promise<NotificationPreferences> => {
  const defaults: NotificationPreferences = {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    userId,
    updatedAt: new Date().toISOString(),
  };

  const prefRef = doc(db, COLLECTION, userId);
  await setDoc(prefRef, defaults);

  return defaults;
};
