import { Tabs } from '@/components/ui/Tab';
import { SETTING_TAB_TYPE } from '@/types';
import { ReactNode, useMemo } from 'react';
import { BasicAuth } from './BasicAuth';
import { DelayBetweenScreenshots } from './DelayBetweenScreenshots';
import { ScreenshotOptionsSetting } from './ScreenshotOptionsSetting';
import { ScreenshotSchedule } from './ScreenshotSchedule';
import { SlackWebhookURL } from './SlackWebhookURL';
import { Content } from './styles';

export const SettingTabs = () => {
  const tabs = useMemo(
    () =>
      new Map<SETTING_TAB_TYPE, ReactNode>([
        [
          SETTING_TAB_TYPE.BASIC_AUTH,
          <Content key={SETTING_TAB_TYPE.BASIC_AUTH}>
            <BasicAuth />
          </Content>,
        ],
        [
          SETTING_TAB_TYPE.SCREENSHOT_OPTIONS,
          <Content key={SETTING_TAB_TYPE.SCREENSHOT_OPTIONS}>
            <ScreenshotOptionsSetting />
          </Content>,
        ],
        [
          SETTING_TAB_TYPE.SCREENSHOT_SCHEDULE,
          <Content key={SETTING_TAB_TYPE.SCREENSHOT_SCHEDULE}>
            <ScreenshotSchedule />
          </Content>,
        ],
        [
          SETTING_TAB_TYPE.SLACK_WEBHOOK_URL,
          <Content key={SETTING_TAB_TYPE.SLACK_WEBHOOK_URL}>
            <SlackWebhookURL />
          </Content>,
        ],
        [
          SETTING_TAB_TYPE.DELAY_BETWEEN_SCREENSHOTS,
          <Content key={SETTING_TAB_TYPE.DELAY_BETWEEN_SCREENSHOTS}>
            <DelayBetweenScreenshots />
          </Content>,
        ],
      ]),
    []
  );

  return <Tabs tabs={tabs} />;
};
