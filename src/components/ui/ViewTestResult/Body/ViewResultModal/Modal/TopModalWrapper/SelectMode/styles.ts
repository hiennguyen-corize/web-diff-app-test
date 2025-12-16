import styled from 'styled-components';

export const ModesWrapper = styled.ul`
  display: flex;
  gap: 30px;
  width: 360px;
  justify-content: flex-end;
`;

export const ModeItem = styled.li`
  cursor: pointer;
`;

export const ModesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23.17px;
`;

export const ModeTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  text-align: right;
  color: ${({ theme }) => theme.colors.shade_200};
`;
