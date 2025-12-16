import { RESULT_VIEW_MODE } from '@/types';
import { atom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import DiffPixelActiveIcon from './assets/diff-pixel-active.svg';
import DiffPixelNormalIcon from './assets/diff-pixel-normal.svg';
import SliderActiveIcon from './assets/slider-active.svg';
import SliderNormalIcon from './assets/slider-normal.svg';

export const currentModeAtom = atom<RESULT_VIEW_MODE>(
  RESULT_VIEW_MODE.DIFF_PIXEL
);

export const useSelectMode = () => {
  const [currentMode, setCurrentMode] = useAtom(currentModeAtom);

  const selectMode = useCallback(
    (mode: RESULT_VIEW_MODE) => {
      setCurrentMode(mode);
    },
    [setCurrentMode]
  );

  const selectModes = useMemo(
    () => [
      {
        id: RESULT_VIEW_MODE.DIFF_PIXEL,
        title: 'Diff Pixel',
        normalIcon: DiffPixelNormalIcon,
        activeIcon: DiffPixelActiveIcon,
        onClick: () => selectMode(RESULT_VIEW_MODE.DIFF_PIXEL),
      },
      {
        id: RESULT_VIEW_MODE.SLIDER,
        title: 'Slider',
        normalIcon: SliderNormalIcon,
        activeIcon: SliderActiveIcon,
        onClick: () => selectMode(RESULT_VIEW_MODE.SLIDER),
      },
      // {
      //   id: RESULT_VIEW_MODE.TRANSPARENT_OVERLAY,
      //   title: 'Transparent Overlay',
      //   normalIcon: TransparentOverlayNormalIcon,
      //   activeIcon: TransparentOverlayActiveIcon,
      //   onClick: () => selectMode(RESULT_VIEW_MODE.TRANSPARENT_OVERLAY),
      // },
      // {
      //   id: RESULT_VIEW_MODE.INVERT,
      //   title: 'Invert',
      //   normalIcon: InvertNormalIcon,
      //   activeIcon: InvertActiveIcon,
      //   onClick: () => selectMode(RESULT_VIEW_MODE.INVERT),
      // },
    ],
    [selectMode]
  );

  return { currentMode, selectModes };
};
