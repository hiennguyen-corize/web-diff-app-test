import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  height: auto;
  min-height: 100%;
  position: relative;
  max-width: 1920px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  padding: 87px 135px 0 135px;
`;

export const RootModalPortal = styled.div`
  display: block;
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;
