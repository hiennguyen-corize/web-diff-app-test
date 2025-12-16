import styled from 'styled-components';

export const ViewTestResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow-y: scroll;
  max-width: 1920px;
  margin: 0 auto;
  gap: 42px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 117px 135px;
  background-color: ${({ theme }) => theme.colors.shade_200};
  z-index: ${({ theme }) => theme.zIndex.fullModal};
`;
