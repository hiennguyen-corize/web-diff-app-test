import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const UpgradeButtonWrapper = styled.div`
  ${ButtonWrapper} {
    background-color: ${({ theme }) => theme.colors.primary_200};
  }
`;
