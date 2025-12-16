import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  gap: 60px;
  height: 100%;
  align-items: stretch;
`;

export const TabNav = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  height: fit-content;
  gap: 45px;
  top: 140px;
  height: calc(100dvh - 140px);
  padding-right: 20px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Content = styled.div`
  padding-left: 20px;
`;
