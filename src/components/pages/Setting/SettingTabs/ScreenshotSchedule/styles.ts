import styled from 'styled-components';

export const ScreenshotScheduleWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const CheckLabel = styled.label`
  display: flex;
  cursor: pointer;
  user-select: none;
  gap: 32px;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primary_700};
`;
