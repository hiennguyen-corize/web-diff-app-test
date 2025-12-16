import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  z-index: ${({ theme }) => theme.zIndex.header};
  background-color: ${({ theme }) => theme.colors.shade_200};
  position: fixed;
  transition: all 0.2s ease-out;
  max-width: 1920px;
`;

export const HeaderWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 16.5px 135px;
`;
