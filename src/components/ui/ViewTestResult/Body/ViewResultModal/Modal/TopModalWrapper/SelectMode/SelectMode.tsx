import { Tooltip } from '@/components/ui/Tooltip';
import { RESULT_VIEW_MODE } from '@/types';
import Image from 'next/image';
import { forwardRef } from 'react';
import { ModeItem, ModesSection, ModesWrapper, ModeTitle } from './styles';
import { useSelectMode } from './useSelectMode';

const viewModeTitles = {
  [RESULT_VIEW_MODE.SLIDER]: 'Slider',
  [RESULT_VIEW_MODE.INVERT]: 'Invert',
  [RESULT_VIEW_MODE.DIFF_PIXEL]: 'Diff Pixel',
  [RESULT_VIEW_MODE.TRANSPARENT_OVERLAY]: 'Transparent Overlay',
};

export const SelectMode = forwardRef<HTMLDivElement>((__, ref) => {
  const { currentMode, selectModes } = useSelectMode();

  return (
    <ModesSection ref={ref}>
      <ModeTitle>View Mode: {viewModeTitles[currentMode]}</ModeTitle>
      <ModesWrapper>
        {selectModes.map(({ id, title, normalIcon, activeIcon, onClick }) => (
          <ModeItem key={id} onClick={onClick}>
            <Tooltip content={title}>
              <Image
                src={currentMode === id ? activeIcon : normalIcon}
                alt={title}
              />
            </Tooltip>
          </ModeItem>
        ))}
      </ModesWrapper>
    </ModesSection>
  );
});

SelectMode.displayName = 'SelectMode';
