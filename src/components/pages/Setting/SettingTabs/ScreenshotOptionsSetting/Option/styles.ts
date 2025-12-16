import { ErrorMessage, InputWrapper } from '@/components/ui/Form/Input/styles';
import styled from 'styled-components';

export const InputGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputWrappers = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  ${InputWrapper} {
    flex: 1 1 50%;
  }
  ${ErrorMessage} {
    line-height: 16px;
    height: 20px;
    padding-left: 10px;
  }
`;

export const SettingIconButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  height: 58px;
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const InputText = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.secondary_270};
  transition: all 0.2s ease-out;
  border-radius: 8px;
  padding: 16px 23px;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
`;

export const FormTitleWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const FormFieldTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary_700};
  flex: 1 1 50%;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;
