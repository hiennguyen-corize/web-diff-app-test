import styled from 'styled-components';

export const TopTabWrapper = styled.div`
  gap: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProjectName = styled.h3`
  overflow: hidden;
  font-style: normal;
  font-weight: 700;
  font-size: 42.67px;
  line-height: 53.33px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const ProjectNameWrapper = styled.div`
  flex: 1 1 65%;
  align-items: center;
  overflow: auto;
  display: flex;
  gap: 16px;
`;

export const ActionButtonsWrapper = styled.div`
  justify-content: flex-end;
  display: flex;
  gap: 24px;
  flex: 1 1 35%;
`;

export const TopTapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
