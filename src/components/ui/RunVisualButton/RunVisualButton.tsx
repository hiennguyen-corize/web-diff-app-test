import { Button } from '@/components/ui/Button';
import { BUTTON_TYPE } from '@/types';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import ScreenshotIcon from './assets/screenshot.svg';
import { useVisualSnaps } from './runVisualSnaps.hooks';
import { Custom } from './styles';

export type RunVisualButtonRefType = {
  runVisualCheck: () => void;
};

/**
 * A button that runs a visual check on the current page.
 * While the check is running, the button is disabled and the title is changed to "Creating visual check...".
 * The button is wrapped in a custom div with a class to allow for custom styling.
 */
export const RunVisualButton = forwardRef<RunVisualButtonRefType>((__, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { createCommitDocs, isRunning } = useVisualSnaps();

  const title = isRunning ? 'Creating visual check...' : 'Screen visual check';

  useImperativeHandle(
    ref,
    () => ({
      runVisualCheck() {
        buttonRef.current?.click();
      },
    }),
    []
  );

  return (
    <Custom>
      <Button
        ref={buttonRef}
        onClick={() => createCommitDocs()}
        disabled={isRunning}
        options={{
          type: BUTTON_TYPE.PRIMARY_DEFAULT_LARGE,
          title,
          icon: ScreenshotIcon,
        }}
      />
    </Custom>
  );
});

RunVisualButton.displayName = 'RunVisualButton';
