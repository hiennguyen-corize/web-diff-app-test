import styled from 'styled-components';

export const InputWrapper = styled.div<{ $isError: boolean }>`
  position: relative;
`;

export const TextAreaInput = styled.textarea<{ $isError: boolean }>`
  border: 1px solid
    ${({ theme, $isError }) =>
      $isError ? theme.colors.false_700 : theme.colors.secondary_270};
  background-color: ${({ theme, $isError }) =>
    $isError && theme.colors.false_250};
  transition: all 0.2s ease-out;
  height: 153px;
  width: 100%;
  display: block;
  border-radius: 8px;
  padding: 16px 24px;
`;

export const ErrorMessage = styled.div<{ $isError: boolean }>`
  display: flex;
  align-items: flex-end;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding-left: 10px;
  transition: all 0.2s ease-out;
  color: ${({ theme }) => theme.colors.false_700};
  height: ${({ $isError }) => ($isError ? '28px' : '24px')};
`;

export const InputWrap = styled.div`
  position: relative;
  height: fit-content;
`;
