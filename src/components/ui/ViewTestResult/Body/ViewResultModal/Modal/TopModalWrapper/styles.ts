import styled from 'styled-components';

export const TopModalContent = styled.div<{ $isCenter: boolean }>`
  flex: 1 1 auto;
  max-height: fit-content;
  width: 90%;
  gap: 16px;
  display: flex;
  justify-content: ${({ $isCenter }) =>
    $isCenter ? 'center' : 'space-between'};
`;
