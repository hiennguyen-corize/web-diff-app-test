import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const Custom = styled.div`
  ${ButtonWrapper} {
    padding: 16px;
    width: 100%;
  }
`;

export const ErrorWrapper = styled.div`
  color: ${({ theme }) => theme.colors.false_700};
`;
