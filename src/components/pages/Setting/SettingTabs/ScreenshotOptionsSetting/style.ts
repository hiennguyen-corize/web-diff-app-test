import { ButtonWrapper } from '@/components/ui/Button/styles';
import Image from 'next/image';
import styled from 'styled-components';

export const SettingContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BaseFont = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
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

export const ButtonText = styled.span`
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const CustomButtonWrapper = styled(ButtonWrapper)`
  width: 100%;
  position: relative;
  padding: 0;
  border-color: transparent;
  &:hover {
    border-color: transparent;
  }
  &:disabled {
    border-color: transparent;
    ${ButtonText}, img {
      opacity: 0.5;
    }
  }
`;

export const ButtonContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
`;

export const ButtonTextWrapper = styled.div`
  display: flex;
  align-items: center;
  border: none;
  justify-content: center;
  gap: 8px;
`;

export const BackgroundImage = styled(Image)`
  position: absolute;
  gap: 8px;
`;
