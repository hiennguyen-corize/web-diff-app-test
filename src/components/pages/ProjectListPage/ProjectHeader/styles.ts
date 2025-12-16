import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  max-width: 1920px;
  top: 86px;
  margin: 0 auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 74px 135px 25px 135px;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.pageActions};
  background-color: ${({ theme }) => theme.colors.shade_200};
`;
