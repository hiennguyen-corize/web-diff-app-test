import styled from 'styled-components';

export const SignInWrapper = styled.div`
  overflow-x: hidden;
  height: 100%;
`;

export const SignInContentWrapper = styled.div`
  padding: 16px 0 103px 0;
`;

export const SignInForm = styled.form`
  margin: 0 auto;
  max-width: 651px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 64px 84px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignInTitle = styled.h3`
  font-size: 48px;
  line-height: 48px;
  text-align: center;
  font-weight: 600;
`;

export const SignInSubTitle = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary_270};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrap = styled.div<{ $isError: boolean }>`
  margin-bottom: ${({ $isError }) => ($isError ? '16px' : '0')};
`;
