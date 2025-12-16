import styled from 'styled-components';

export const SliderWrapper = styled.div<{ $show: boolean }>`
  height: 100%;
  display: ${({ $show }) => ($show ? 'block' : 'none')};

  .handle-container {
    display: none !important;
  }

  .handle {
    position: fixed !important;
  }
`;

export const Figure = styled.figure<{ $show: boolean }>`
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const PlaceholderImage = styled.div<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  height: 100%;
  img {
    height: 100%;
  }
`;
