import {
  CloseIcon,
  ModalContainer,
  ModalWrapper,
} from '@/components/ui/Modal/styles';
import styled from 'styled-components';

export const WrapperModal = styled.div`
  cursor: default;
  ${CloseIcon} {
    top: 0;
  }
  ${ModalContainer} {
    width: 762px;
    margin: 30px;
  }
  ${ModalWrapper} {
    padding: 30px 0px;
  }
`;

export const FormCreateProject = styled.div`
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

export const ProjectInput = styled.input`
  width: 100%;
  height: 56px;
  display: block;
  border: 1px solid;
  border-radius: 8px;
  padding-left: 25px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  display: block;
  height: 153px;
  border: 1px solid;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.2s ease-out;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
  gap: 11px;
`;
