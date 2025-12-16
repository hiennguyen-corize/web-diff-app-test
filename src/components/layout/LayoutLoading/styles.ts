import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
   }
  to {
    opacity: 1;
   }
`;

export const ContentWrapper = styled.div`
  animation: ${fadeIn} 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
  animation-direction: alternate;
  animation-play-state: running;
`;
