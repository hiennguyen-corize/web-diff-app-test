import { currentDeviceAtom } from '@/components/ui/ViewTestResult/Body';
import { currentModeAtom } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal/TopModalWrapper/SelectMode';
import { CommitPageSnapshotType } from '@/models/GetCommitsType';
import { DEVICE_TYPE, RESULT_VIEW_MODE } from '@/types';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo } from 'react';

export type CompareInputDataType = {
  matched: number;
  result: string;
  from?: string;
  to: string;
};

export const useModalContentInputData = (
  commitPageSnapshot: CommitPageSnapshotType
) => {
  const currentDevice = useAtomValue(currentDeviceAtom);
  const currentMode = useAtomValue(currentModeAtom);

  const handleDeviceData = useCallback(
    (
      commitPageSnapshot: CommitPageSnapshotType,
      currentDevice: number
    ): CompareInputDataType => {
      const desktopFrom =
        commitPageSnapshot.screenshot.compareFrom?.imagePaths.desktop;
      const tabletFrom =
        commitPageSnapshot.screenshot.compareFrom?.imagePaths.tablet;
      const mobileFrom =
        commitPageSnapshot.screenshot.compareFrom?.imagePaths.mobile;

      const {
        screenshot: {
          compareTo: {
            imagePaths: {
              desktop: desktopTo,
              tablet: tabletTo,
              mobile: mobileTo,
            },
          },
          comparedImages: { desktop, tablet, mobile },
        },
      } = commitPageSnapshot;

      switch (currentDevice) {
        case DEVICE_TYPE.TABLET:
          return {
            matched: tablet.matchPercent,
            result: tablet.url,
            from: tabletFrom,
            to: tabletTo,
          };

        case DEVICE_TYPE.MOBILE:
          return {
            matched: mobile.matchPercent,
            result: mobile.url,
            from: mobileFrom,
            to: mobileTo,
          };

        default:
          return {
            matched: desktop.matchPercent,
            result: desktop.url,
            from: desktopFrom,
            to: desktopTo,
          };
      }
    },
    []
  );

  const compareInputData: CompareInputDataType = useMemo(() => {
    const desktopFrom =
      commitPageSnapshot.screenshot.compareFrom?.imagePaths?.desktop;
    const tabletFrom =
      commitPageSnapshot.screenshot.compareFrom?.imagePaths?.tablet;
    const mobileFrom =
      commitPageSnapshot.screenshot.compareFrom?.imagePaths?.mobile;

    const {
      screenshot: {
        compareTo: {
          imagePaths: {
            desktop: desktopTo,
            tablet: tabletTo,
            mobile: mobileTo,
          },
        },
        comparedImages: { desktop, tablet, mobile },
      },
    } = commitPageSnapshot;

    switch (`${currentMode}_${currentDevice}`) {
      case `${RESULT_VIEW_MODE.DIFF_PIXEL}_${DEVICE_TYPE.DESKTOP}`:
        return {
          result: desktop.url,
          matched: desktop.matchPercent,
          from: desktopFrom,
          to: desktopTo,
        };

      case `${RESULT_VIEW_MODE.DIFF_PIXEL}_${DEVICE_TYPE.TABLET}`:
        return {
          result: tablet.url,
          matched: tablet.matchPercent,
          from: tabletFrom,
          to: tabletTo,
        };

      case `${RESULT_VIEW_MODE.DIFF_PIXEL}_${DEVICE_TYPE.MOBILE}`:
        return {
          result: mobile.url,
          matched: mobile.matchPercent,
          from: mobileFrom,
          to: mobileTo,
        };

      default:
        return handleDeviceData(commitPageSnapshot, currentDevice);
    }
  }, [commitPageSnapshot, currentDevice, currentMode, handleDeviceData]);

  return { compareInputData };
};
