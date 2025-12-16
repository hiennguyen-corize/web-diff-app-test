import { ButtonWrapper } from '@/components/ui/Button/styles';
import { InputText } from '@/components/ui/Form/Input/styles';
import { TextAreaInput } from '@/components/ui/Form/TextArea/styles';
import { ModalWrapper } from '@/components/ui/Modal/styles';
import styled from 'styled-components';

export const WrapperModel = styled.div`
  ${ModalWrapper} {
    padding: 30px 0px;
  }
`;

export const FormCreateProject = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const DescriptionTextArea = styled.textarea<{ $isError: boolean }>`
  height: 153px;
  width: 100%;
  display: block;
  border-radius: 8px;
  padding: 16px 24px;
  resize: none;
  border: solid 1px
    ${({ theme, $isError }) =>
      $isError ? theme.colors.false_700 : theme.colors.secondary_270};
`;

export const AddNewButton = styled.div`
  margin-top: 10px;
  ${ButtonWrapper} {
    width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
  gap: 11px;
`;

export const CustomInput = styled.div<{ $isError: boolean }>`
  ${InputText}, ${TextAreaInput} {
    border-color: ${({ theme, $isError }) =>
      $isError ? theme.colors.false_700 : theme.colors.secondary_700};
  }
`;
