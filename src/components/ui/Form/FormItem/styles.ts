import styled from 'styled-components';

export const FormItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormInputWrapper = styled.div<{
  $isError: boolean;
  $marginBottom: number;
}>`
  transition: all 0.2s ease-out;
  margin-bottom: ${({ $isError, $marginBottom }) =>
    $isError ? `${$marginBottom}px` : '0'};
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;
