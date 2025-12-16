import styled from 'styled-components';

export const CSVInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed ${({ theme }) => theme.colors.secondary_270};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary_200};
  width: 100%;
  height: 250px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary_250};
  }
`;

export const CSVLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
  padding-top: 20px;

  input {
    display: none;
  }
`;

export const UploadCSVIcon = styled.svg`
  margin-bottom: 16px;
  height: 32px;
  width: 32px;
  color: ${({ theme }) => theme.colors.secondary_700};
`;

export const UploadCSVText = styled.p`
  margin-bottom: 8px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondary_700};

  span {
    font-weight: 600;
  }
`;
