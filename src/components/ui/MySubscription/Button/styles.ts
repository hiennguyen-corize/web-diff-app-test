import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  gap: 8px;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  padding: 8px 16px;
  border-radius: 5px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  transition: all 0.25s ease-out;
  color: ${({ theme }) => theme.colors.primary_700};
  border: 1px solid ${({ theme }) => theme.colors.primary_900};

  &:hover {
    background-color: ${({ theme }) => theme.colors.shade_250};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.shade_270};
    color: ${({ theme }) => theme.colors.secondary_270};
    border-color: ${({ theme }) => theme.colors.secondary_270};
  }
`;
