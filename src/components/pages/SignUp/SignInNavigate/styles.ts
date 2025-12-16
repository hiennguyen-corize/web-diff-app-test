import { Link } from 'next-view-transitions';
import styled from 'styled-components';

export const SignInNavigateText = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.secondary_270};
`;

export const NavigateLink = styled(Link)`
  padding-left: 5px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primary_700};
`;
