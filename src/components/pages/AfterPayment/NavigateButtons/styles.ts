import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const SuccessButtonWrapper = styled.div`
  ${ButtonWrapper} {
    width: 100%;
  }
`;

export const FailButtonWrapper = styled.div`
  display: flex;
  gap: 32px;

  ${ButtonWrapper} {
    width: 100%;
  }
`;
