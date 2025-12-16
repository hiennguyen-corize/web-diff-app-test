import { currentDeviceAtom } from '@/components/ui/ViewTestResult/Body';
import { useModalSwitching } from '@/hooks/useModalSwitching.hooks';
import { DEVICE_TYPE } from '@/types';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { forwardRef, useMemo } from 'react';
import DesktopActiveIcon from './assets/desktop-active.svg';
import DesktopIcon from './assets/desktop.svg';
import MobileActiveIcon from './assets/mobile-active.svg';
import MobileIcon from './assets/mobile.svg';
import TabletActiveIcon from './assets/tablet-active.svg';
import TabletIcon from './assets/tablet.svg';
import { DeviceSelectWrapper, ImageWrapper } from './styles';

export const DeviceSelect = forwardRef<HTMLDivElement>((_, deviceSelectRef) => {
  const [currentDevice, setCurrentDevice] = useAtom(currentDeviceAtom);
  const { setSwitching } = useModalSwitching();

  const deviceItems = useMemo(
    () => [
      {
        value: DEVICE_TYPE.DESKTOP,
        inActiveIcon: DesktopIcon,
        activeIcon: DesktopActiveIcon,
      },
      {
        value: DEVICE_TYPE.TABLET,
        inActiveIcon: TabletIcon,
        activeIcon: TabletActiveIcon,
      },
      {
        value: DEVICE_TYPE.MOBILE,
        inActiveIcon: MobileIcon,
        activeIcon: MobileActiveIcon,
      },
    ],
    []
  );

  return (
    <DeviceSelectWrapper ref={deviceSelectRef}>
      {deviceItems.map((item) => (
        <ImageWrapper key={item.value}>
          <Image
            src={
              currentDevice === item.value ? item.activeIcon : item.inActiveIcon
            }
            alt={'device-icon'}
            onClick={() => {
              setSwitching();
              setCurrentDevice(item.value);
            }}
          />
        </ImageWrapper>
      ))}
    </DeviceSelectWrapper>
  );
});

DeviceSelect.displayName = 'DeviceSelect';
