import { ButtonWrapper } from '@/components/ui/Button/styles';
import { ModalContainer } from '@/components/ui/Modal/styles';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 100%;

  ${ModalContainer} {
    padding: 60px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-width: 580.88px;
`;

export const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const ReasonsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ErrorMessageWrapper = styled.li`
  word-break: break-word;
  text-align: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 30px;

  ${ButtonWrapper} {
    height: 40px;
    width: 105px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
`;
