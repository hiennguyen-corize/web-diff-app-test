import styled from 'styled-components';

export const ProjectName = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 42.67px;
  line-height: 53.33px;
  flex: 1 1 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  justify-content: space-between;
`;
