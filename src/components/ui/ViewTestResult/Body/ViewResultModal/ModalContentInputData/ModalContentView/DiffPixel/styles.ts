import styled from 'styled-components';

export const ImageWrapper = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  height: 100%;
  img {
    position: relative;
    object-fit: cover;
    width: 100%;
    min-height: 100%;
  }
`;

export const PlaceholderImage = styled.div`
  height: 100%;
  img {
    height: 100%;
  }
`;

export const ImageDisplay = styled.div<{ $show: boolean }>`
  opacity: ${({ $show }) => ($show ? 100 : 0)};
  transition: opacity 0.25s ease-out;
`;
