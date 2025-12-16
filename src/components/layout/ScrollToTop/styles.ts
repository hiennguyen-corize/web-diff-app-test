import styled from 'styled-components';

export const ScrollToTopWrapper = styled.button`
  right: 32px;
  bottom: 32px;
  width: 45px;
  height: 45px;
  display: flex;
  position: fixed;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.scrollToTop};
  background-color: ${({ theme }) => theme.colors.secondary_270};
`;

export const Arrow = styled.span`
  margin-top: 6px;
  height: 12px;
  width: 12px;
  transform: rotate(45deg);
  border-left: 1px solid white;
  border-top: 1px solid white;
`;
