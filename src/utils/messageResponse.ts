import { t } from 'i18next';

export const messageResult: Record<string, string> = {
  DEFAULT_MESSAGE: t('notifications.defaultMessage'),
};

export function convertMessageResponse(type: string) {
  return messageResult[type] ?? messageResult['DEFAULT_MESSAGE'];
}
