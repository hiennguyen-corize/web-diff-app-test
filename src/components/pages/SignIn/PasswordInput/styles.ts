import Link from 'next/link';
import styled from 'styled-components';

export const PasswordInputWrapper = styled.div`
  position: relative;
`;

export const ForgotPasswordLink = styled(Link)<{ $isError: boolean }>`
  position: absolute;
  right: 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  bottom: ${({ $isError }) => ($isError ? '0' : '-5px')};
  color: ${({ theme }) => theme.colors.secondary_270};
`;
