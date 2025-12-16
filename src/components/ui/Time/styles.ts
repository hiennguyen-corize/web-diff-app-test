import styled from 'styled-components';

export const TimeWrapper = styled.div<{ $gap?: number }>`
  display: flex;
  gap: ${({ $gap }) => `${$gap ? $gap : 25}px`};
`;
