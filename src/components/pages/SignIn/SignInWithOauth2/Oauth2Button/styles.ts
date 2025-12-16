import styled from 'styled-components';

export const Oauth2ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_270};
  border-radius: 8px;
  width: 100%;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;
