import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ValueOf } from 'next/dist/shared/lib/constants';
import { ReactElement, ReactNode } from 'react';

export const SCREENSHOT_STATUS_TYPE = {
  pending: 'pending',
  error: 'error',
  done: 'done',
  fail: 'fail',
  pass: 'pass',
} as const;

export type SCREENSHOT_STATUS_TYPE = keyof typeof SCREENSHOT_STATUS_TYPE;

export const USER_PLANS_TYPE = {
  FREE: 1,
  PREMIUM: 2,
  ENTERPRISE: 3,
} as const;

export type USER_PLANS_TYPE = ValueOf<typeof USER_PLANS_TYPE>;

export const USER_PLAN_NAME_TYPE = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export type USER_PLAN_NAME_TYPE = keyof typeof USER_PLAN_NAME_TYPE;

export const USER_PLAN_PRICE_TYPE = {
  FREE: 0,
  PREMIUM: 9,
  ENTERPRISE: 29,
} as const;

export type USER_PLAN_PRICE_TYPE = keyof typeof USER_PLAN_PRICE_TYPE;

export const AfterPaymentPageType = {
  COMPLETE: 'COMPLETE',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
} as const;

export type AfterPaymentPageType = keyof typeof AfterPaymentPageType;

export const USER_RULE_TYPE = {
  ADMIN: 1,
  USER: 0,
} as const;

export type USER_RULE_TYPE = ValueOf<typeof USER_RULE_TYPE>;

export const USER_STATUS_TYPE = {
  INACTIVE: 0,
  ACTIVE: 1,
  BANNED: 2,
} as const;

export type USER_STATUS_TYPE = ValueOf<typeof USER_STATUS_TYPE>;

export const SETTING_TAB_TYPE = {
  BASIC_AUTH: 'Basic authentication',
  SCREENSHOT_OPTIONS: 'Screenshot Global Variables',
  SCREENSHOT_SCHEDULE: 'Setup Auto Screenshot Schedule',
  SLACK_WEBHOOK_URL: 'Slack Webhook URL',
  DELAY_BETWEEN_SCREENSHOTS: 'Delay Between Screenshots',
} as const;

export type SETTING_TAB_TYPE = ValueOf<typeof SETTING_TAB_TYPE>;

export const BUTTON_TYPE = {
  PRIMARY_SUBTLE_LARGE: 0,
  PRIMARY_DEFAULT_LARGE: 1,
  SECONDARY: 2,
  CHOOSE_USER_TYPE: 3,
  NAVIGATE_UPGRADE: 4,
  GHOST_DEFAULT_LARGE: 5,
  PRIMARY_DEFAULT_SMALL: 6,
  SECONDARY_SUBTLE_SMALL: 7,
  SECONDARY_MINIMAL_SMALL: 8,
  SECONDARY_SUBTLE_LARGE: 9,
  SECONDARY_MINIMAL_LARGE: 10,
  SECONDARY_DARK_LARGE: 11,
} as const;

export type BUTTON_TYPE = ValueOf<typeof BUTTON_TYPE>;

export type ApiResponseCommon = { message: string };

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const DEVICE_TYPE = {
  DESKTOP: 0,
  TABLET: 1,
  MOBILE: 2,
} as const;

export type DEVICE_TYPE = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];

export const RESULT_VIEW_MODE = {
  DIFF_PIXEL: 0,
  TRANSPARENT_OVERLAY: 1,
  SLIDER: 2,
  INVERT: 3,
} as const;

export type RESULT_VIEW_MODE =
  (typeof RESULT_VIEW_MODE)[keyof typeof RESULT_VIEW_MODE];

export const PROJECT_DETAIL_STATE_TYPE = {
  DEFAULT: 0,
  NOT_PAGES_AND_COMMITS: 1,
  HAVE_PAGES_BUT_NOT_COMMITS: 2,
} as const;

export type PROJECT_DETAIL_STATE_TYPE =
  (typeof PROJECT_DETAIL_STATE_TYPE)[keyof typeof PROJECT_DETAIL_STATE_TYPE];

export const COMMIT_BUTTON_TYPE = {
  CANCEL: 0,
  REJECT: 1,
  APPROVE: 2,
} as const;

export type COMMIT_BUTTON_TYPE =
  (typeof COMMIT_BUTTON_TYPE)[keyof typeof COMMIT_BUTTON_TYPE];

export const SHARE_SCREEN_TYPE = {
  FIRST: 0,
  SECOND: 1,
} as const;

export type SHARE_SCREEN_TYPE =
  (typeof SHARE_SCREEN_TYPE)[keyof typeof SHARE_SCREEN_TYPE];

export const TIME_SUFFIXES_TYPE = {
  AM: 'AM',
  PM: 'PM',
} as const;

export type TIME_SUFFIXES_TYPE =
  (typeof TIME_SUFFIXES_TYPE)[keyof typeof TIME_SUFFIXES_TYPE];

export const COMMIT_STATE = {
  IDLE: 0,
  CANCELED: 1,
  REJECTED: 2,
  APPROVED: 3,
} as const;

export type COMMIT_STATE = (typeof COMMIT_STATE)[keyof typeof COMMIT_STATE];

export const CHECKSUM_RESULT = {
  MATCH: 'Match',
  MISMATCH: 'Mismatch',
} as const;

export type CHECKSUM_RESULT =
  (typeof CHECKSUM_RESULT)[keyof typeof CHECKSUM_RESULT];

export const PaymentStatusType = {
  NO_PAYMENT_REQUIRED: 'no_payment_required',
  PAID: 'paid',
  UNPAID: 'unpaid',
} as const;

export type PaymentStatusType =
  (typeof PaymentStatusType)[keyof typeof PaymentStatusType];
