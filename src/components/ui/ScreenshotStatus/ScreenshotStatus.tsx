import { Tooltip } from '@/components/ui/Tooltip';
import { currentDeviceAtom } from '@/components/ui/ViewTestResult/Body';
import { CommitStatusType } from '@/models/GetCommitsType';
import { DEVICE_TYPE, SCREENSHOT_STATUS_TYPE } from '@/types';
import { useSetAtom } from 'jotai';
import { keyBy } from 'lodash';
import Image from 'next/image';
import { FC } from 'react';
import desktopFailStatusIcon from './assets/desktopFailStatus.svg';
import desktopPassStatusIcon from './assets/desktopPassStatus.svg';
import desktopPendingStatusIcon from './assets/desktopPendingStatus.svg';
import mobileFailStatusIcon from './assets/mobileFailStatus.svg';
import mobilePassStatusIcon from './assets/mobilePassStatus.svg';
import mobilePendingStatusIcon from './assets/mobilePendingStatus.svg';
import tabletFailStatusIcon from './assets/tabletFailStatus.svg';
import tabletPassStatusIcon from './assets/tabletPassStatus.svg';
import tabletPendingStatusIcon from './assets/tabletPendingStatus.svg';
import { DeviceStatusWrapper } from './styles';

type Props = {
  status?: CommitStatusType;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const deviceKeys = {
  desktop: 'desktop',
  tablet: 'tablet',
  mobile: 'mobile',
} as const;

const pending = SCREENSHOT_STATUS_TYPE.pending;
const error = SCREENSHOT_STATUS_TYPE.error;
const fail = SCREENSHOT_STATUS_TYPE.fail;
const pass = SCREENSHOT_STATUS_TYPE.pass;
const done = SCREENSHOT_STATUS_TYPE.done;

const statusDevices = [
  {
    id: DEVICE_TYPE.MOBILE,
    name: deviceKeys.mobile,
    icons: {
      [pass]: mobilePassStatusIcon,
      [pending]: mobilePendingStatusIcon,
      [fail]: mobileFailStatusIcon,
      [error]: mobileFailStatusIcon,
      [done]: mobileFailStatusIcon,
    },
  },
  {
    id: DEVICE_TYPE.TABLET,
    name: deviceKeys.tablet,
    icons: {
      [pass]: tabletPassStatusIcon,
      [pending]: tabletPendingStatusIcon,
      [fail]: tabletFailStatusIcon,
      [error]: tabletFailStatusIcon,
      [done]: tabletFailStatusIcon,
    },
  },
  {
    id: DEVICE_TYPE.DESKTOP,
    name: deviceKeys.desktop,
    icons: {
      [pass]: desktopPassStatusIcon,
      [pending]: desktopPendingStatusIcon,
      [fail]: desktopFailStatusIcon,
      [error]: desktopFailStatusIcon,
      [done]: desktopFailStatusIcon,
    },
  },
];

const statusDevicesObject = keyBy(statusDevices, 'name');

/**
 * Component to display the status of a screenshot.
 *
 * @param {Object} props - Component props.
 * @param {SCREENSHOT_STATUS_TYPE} props.status - The status of the screenshot (pass, pending, or other).
 * @returns {JSX.Element} A JSX element displaying an icon and label for the screenshot status.
 */
export const ScreenshotStatus: FC<Props> = ({ status, onClick }) => {
  const setCurrentDevice = useSetAtom(currentDeviceAtom);

  return (
    <DeviceStatusWrapper>
      {statusDevices.map((device) => (
        <Tooltip
          key={device.id}
          content={`${device.name} version ${status?.[device.name]}`}
        >
          <Image
            src={
              statusDevicesObject[device.name]?.icons[
                status?.[device.name] || pending
              ]
            }
            onClick={(event) => {
              event.stopPropagation();
              setCurrentDevice(device.id);
              onClick(event);
            }}
            alt='status-icon'
          />
        </Tooltip>
      ))}
    </DeviceStatusWrapper>
  );
};
