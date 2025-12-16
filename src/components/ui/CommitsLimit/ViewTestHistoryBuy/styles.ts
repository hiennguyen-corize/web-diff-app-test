import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const StorageBuy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 60px;
  gap: 24px;
  height: 196px;
  background: ${({ theme }) => theme.colors.primary_200};
  border: 3px solid ${({ theme }) => theme.colors.primary_700};
  border-radius: 16px;
`;

export const HalfLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1 1 50%;
`;

export const HalfRight = styled.div`
  display: flex;
  flex: 1 1 50%;
  justify-content: flex-end;

  ${ButtonWrapper} {
    padding: 28px 24px;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    height: auto;
    letter-spacing: 0.0125em;
    text-transform: capitalize;
  }
`;

export const HalfRow = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.0125em;
`;

export const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  height: 32px;
  background: ${({ theme }) => theme.colors.secondary_700};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.primary_200};
`;

export const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
