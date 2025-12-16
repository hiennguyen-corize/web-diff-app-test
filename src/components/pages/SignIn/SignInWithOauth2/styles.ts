import styled from 'styled-components';

export const SignInWithOauth2Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const OauthTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  display: flex;
  width: 100%;
  gap: 9px;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.secondary_270};

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background-color: ${({ theme }) => theme.colors.secondary_270};
  }

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background-color: ${({ theme }) => theme.colors.secondary_270};
  }
`;
