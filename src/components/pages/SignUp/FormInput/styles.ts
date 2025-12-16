import styled from 'styled-components';

export const FormInputWrapper = styled.div<{
  $isError: boolean;
  $marginBottom: number;
}>`
  transition: all 0.2s ease-out;
  margin-bottom: ${({ $isError, $marginBottom }) =>
    $isError ? `${$marginBottom}px` : '0'};
`;
