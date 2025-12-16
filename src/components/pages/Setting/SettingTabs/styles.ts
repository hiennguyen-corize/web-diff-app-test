import styled, { keyframes } from 'styled-components';

export const showAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(2px);
  }
  50% {
    opacity: 0.7;
    transform: translateY(5px);
    filter: blur(0.5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`;

export const Content = styled.div`
  animation: ${showAnimation} 0.25s ease-in-out forwards;
  padding-bottom: 100px;
  width: 536px;
`;

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 530px;
  margin: 0 auto;
`;

export const Header = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
