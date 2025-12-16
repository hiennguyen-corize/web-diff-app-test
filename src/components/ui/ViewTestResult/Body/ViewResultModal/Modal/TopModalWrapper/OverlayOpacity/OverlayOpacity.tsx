import { currentModeAtom } from '@/components/ui/ViewTestResult/Body/ViewResultModal/Modal/TopModalWrapper/SelectMode';
import { RESULT_VIEW_MODE } from '@/types';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import { InfoWrapper, OpacityRangeWrapper } from './styles';

export const OverlayOpacity = forwardRef<HTMLDivElement | null>((__, ref) => {
  const currentMode = useAtomValue(currentModeAtom);

  const isShow =
    currentMode === RESULT_VIEW_MODE.TRANSPARENT_OVERLAY ||
    currentMode === RESULT_VIEW_MODE.INVERT;

  if (!isShow) {
    return <OpacityRangeWrapper />;
  }

  return (
    <OpacityRangeWrapper ref={ref}>
      <InfoWrapper>
        <span>Overlay Opacity</span>
        <span>0%</span>
      </InfoWrapper>
      <input type='range' name='volume' min='0' max='100' step={10} />
    </OpacityRangeWrapper>
  );
});

OverlayOpacity.displayName = 'OverlayOpacity';
