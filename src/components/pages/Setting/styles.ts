import styled from 'styled-components';

export const SettingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 0;
`;

export const SettingContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 82px;
`;

export const SettingHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 0;
  gap: 16px;
`;

export const Div = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
`;

export const ProjectName = styled(Div)`
  color: ${({ theme }) => theme.colors.primary_700};
`;
