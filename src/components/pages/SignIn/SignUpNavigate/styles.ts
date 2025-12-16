import { Link } from 'next-view-transitions';
import styled from 'styled-components';

export const SignUpNavigateWrapper = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.secondary_270};
`;

export const SignUpLink = styled(Link)`
  padding-left: 5px;
  display: inline;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primary_700};
`;
