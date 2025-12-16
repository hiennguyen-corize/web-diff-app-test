import { COMMIT_BUTTON_TYPE } from '@/types';
import styled, { css } from 'styled-components';

export const ButtonWrapper = styled.button<{ $type: COMMIT_BUTTON_TYPE }>`
  display: flex;
  height: 40px;
  align-items: center;
  width: fit-content;
  min-width: fit-content;
  gap: 8px;
  flex: 1 1 50%;
  max-width: 133px;
  justify-content: center;
  border-radius: 5px;
  transition: all 0.25s ease-out;
  ${({ theme, $type }) => {
    switch ($type) {
      case COMMIT_BUTTON_TYPE.REJECT:
        return css`
          background-color: ${theme.colors.false_700};
          color: ${theme.colors.shade_200};
          &:hover {
            background-color: ${theme.colors.false_750};
          }
        `;

      case COMMIT_BUTTON_TYPE.CANCEL:
        return css`
          background-color: ${theme.colors.secondary_250};
          color: ${theme.colors.secondary_700};
          &:hover {
            background-color: ${theme.colors.secondary_270};
          }
        `;

      default:
        return css`
          background-color: ${theme.colors.primary_700};
          color: ${theme.colors.shade_200};
          &:hover {
            background-color: ${theme.colors.primary_750};
          }
        `;
    }
  }};
`;
