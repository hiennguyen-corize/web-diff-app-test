import styled from 'styled-components';

export const CommonSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const Content = styled.div`
  padding: 30px 40px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

export const ContentLayout = styled.div`
  justify-content: space-between;
  display: flex;
  gap: 30px;
`;

export const ContentSide = styled.div`
  display: flex;
  flex-direction: column;
`;
