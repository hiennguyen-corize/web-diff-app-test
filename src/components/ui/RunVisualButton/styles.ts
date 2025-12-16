import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const Custom = styled.div`
  ${ButtonWrapper} {
    font-weight: 700;
    letter-spacing: 0.0125em;
    color: ${({ theme }) => theme.colors.secondary_900};
    background-color: ${({ theme }) => theme.colors.true_750};
    border: none;
    &:hover {
      background-color: ${({ theme }) => theme.colors.true_770};
    }
  }
`;
