import * as RadixTooltip from '@radix-ui/react-tooltip';
import styled from 'styled-components';

export const StyledContent = styled(RadixTooltip.Content)`
  background-color: ${({ theme }) => theme.colors.secondary_900};
  color: ${({ theme }) => theme.colors.shade_200};
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  max-width: 300px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.2);
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const StyledArrow = styled(RadixTooltip.Arrow)`
  fill: ${({ theme }) => theme.colors.secondary_900};
`;
