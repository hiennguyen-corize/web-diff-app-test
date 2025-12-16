import { ButtonWrapper } from '@/components/ui/Button/styles';
import { ModalContainer, ModalWrapper } from '@/components/ui/Modal/styles';
import styled from 'styled-components';

export const WrapperModel = styled.div`
  ${ModalContainer} {
    width: 762px;
    margin: 30px;
  }
  ${ModalWrapper} {
    padding: 30px 0px;
  }
`;

export const FormEditUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Title = styled.h3`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary_700};
`;

export const GroupInput = styled.div``;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 24px;
`;

export const NameInput = styled.input`
  width: 100%;
  height: 56px;
  display: block;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px 24px;
`;

export const DescriptionTextArea = styled.textarea`
  height: 153px;
  width: 100%;
  display: block;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px 24px;
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

export const SelectWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: block;
  border-radius: 8px;
  padding: 16px 24px;
  color: #929292;
  border: 1px solid #929292;
`;

export const SelectCustom = styled.select`
  width: 100%;
`;

export const OptionCustom = styled.option`
  width: 100%;
`;
