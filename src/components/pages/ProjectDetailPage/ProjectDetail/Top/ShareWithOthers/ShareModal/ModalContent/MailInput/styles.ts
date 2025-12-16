import { ButtonWrapper } from '@/components/ui/Button/styles';
import { InputText } from '@/components/ui/Form/Input/styles';
import styled from 'styled-components';

export const MailInputWrapper = styled.form`
  gap: 10px;
  display: flex;

  ${InputText} {
    width: 525px;
    height: 56px;
  }

  ${ButtonWrapper} {
    height: 56px;
    width: 143px;
  }
`;
