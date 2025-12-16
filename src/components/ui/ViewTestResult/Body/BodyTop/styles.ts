import { ButtonWrapper } from '@/components/ui/CommitButton/styles';
import styled from 'styled-components';

export const BodyTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

export const CommitName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const CommitActions = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const CommitNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CommitId = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_250};
`;

export const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  gap: 30px;

  ${ButtonWrapper} {
    padding: 10px 24px;
  }
`;
