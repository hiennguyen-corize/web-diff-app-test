import { forwardRef, RefObject } from 'react';
import { DeviceSelect } from './DeviceSelect';
import { OverlayOpacity } from './OverlayOpacity';
import { SelectMode } from './SelectMode';
import { TopModalContent } from './styles';

type Props = {
  isFirstScreenshot: boolean;
  modeRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
};

export const TopModalWrapper = forwardRef<HTMLDivElement, Props>(
  ({ overlayRef, modeRef, isFirstScreenshot }, deviceSelectRef) => {
    return (
      <TopModalContent $isCenter={isFirstScreenshot}>
        {!isFirstScreenshot && <OverlayOpacity ref={overlayRef} />}
        <DeviceSelect ref={deviceSelectRef} />
        {!isFirstScreenshot && <SelectMode ref={modeRef} />}
      </TopModalContent>
    );
  }
);

TopModalWrapper.displayName = 'TopModalWrapper';
