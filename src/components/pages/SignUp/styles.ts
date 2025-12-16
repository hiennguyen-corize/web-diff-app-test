import { ButtonWrapper } from '@/components/ui/Button/styles';
import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 652px;
  padding: 80px 84px;
  margin: 40px auto 80px auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SignUpFormTitle = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
`;

export const SignUpFormSubTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary_270};
`;

export const SubmitButtonWrapper = styled.div`
  ${ButtonWrapper} {
    width: 100%;
  }
`;
