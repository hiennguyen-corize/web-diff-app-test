import { TOOLTIP_DELAY_SHOW } from '@/constants/common';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { FC, PropsWithChildren } from 'react';
import { StyledArrow, StyledContent } from './styles';

type Props = {
  content: string;
  isShow?: boolean;
};

export const Tooltip: FC<PropsWithChildren<Props>> = ({
  content,
  isShow = true,
  children,
}) => {
  if (!isShow) {
    return children;
  }

  return (
    <RadixTooltip.Provider delayDuration={TOOLTIP_DELAY_SHOW}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <StyledContent sideOffset={4}>
            {content}
            <StyledArrow />
          </StyledContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
