import { BUTTON_TYPE } from '@/types';
import styled, { css } from 'styled-components';

export const ButtonWrapper = styled.button<{
  $type: BUTTON_TYPE;
}>`
  transition: all 0.2s ease-out;
  text-transform: capitalize;
  align-items: center;
  white-space: nowrap;
  justify-content: center;
  width: fit-content;
  font-style: normal;
  font-weight: 700;
  display: flex;
  gap: 8px;

  ${({ $type }) => {
    switch ($type) {
      case BUTTON_TYPE.PRIMARY_SUBTLE_LARGE:
        return css`
          ${largeButtonFontStyles}
          ${primarySubtleNormalColors}
          &:hover {
            ${primarySubtleHoverColors}
          }
          &:disabled {
            ${primarySubtleDisabledColors}
          }
        `;

      case BUTTON_TYPE.PRIMARY_DEFAULT_LARGE:
        return css`
          ${largeButtonFontStyles}
          ${primaryDefaultNormalColors}
          &:hover {
            ${primaryDefaultHoverColors}
          }
          &:disabled {
            ${primaryDefaultDisabledColors}
          }
        `;

      case BUTTON_TYPE.PRIMARY_DEFAULT_SMALL:
        return css`
          ${smallButtonFontStyles}
          ${primaryDefaultNormalColors}
          &:hover {
            ${primaryDefaultHoverColors}
          }
          &:disabled {
            ${primaryDefaultDisabledColors}
          }
        `;

      case BUTTON_TYPE.GHOST_DEFAULT_LARGE:
        return css`
          ${largeButtonFontStyles}
          ${ghostDefaultNormalColors}
          &:hover {
            ${ghostDefaultHoverColors}
          }
          &:disabled {
            ${ghostDefaultDisabledColors}
          }
        `;

      case BUTTON_TYPE.CHOOSE_USER_TYPE:
        return css`
          ${largeButtonFontStyles}
          ${primarySubtleNormalColors}
          &:hover {
            ${primaryDefaultNormalColors}
          }
          &:disabled {
            ${primaryDefaultDisabledColors}
          }
        `;

      case BUTTON_TYPE.NAVIGATE_UPGRADE:
        return css`
          ${largeButtonFontStyles}
          ${primarySubtleHoverColors}
          &:disabled {
            ${primaryDefaultDisabledColors}
          }
        `;

      case BUTTON_TYPE.SECONDARY_SUBTLE_LARGE:
        return css`
          ${largeButtonFontStyles}
          ${secondarySubtleNormalColors}
          &:hover {
            ${secondarySubtleHoverColors}
          }
          &:disabled {
            ${secondarySubtleDisabledColors}
          }
        `;

      case BUTTON_TYPE.SECONDARY_SUBTLE_SMALL:
        return css`
          ${smallButtonFontStyles}
          ${secondarySubtleNormalColors}
          &:hover {
            ${secondarySubtleHoverColors}
          }
          &:disabled {
            ${secondarySubtleDisabledColors}
          }
        `;

      case BUTTON_TYPE.SECONDARY_MINIMAL_SMALL:
        return css`
          ${smallButtonFontStyles}
          ${secondaryMinimalNormalColors}
          &:hover {
            ${secondaryMinimalHoverColors}
          }
          &:disabled {
            ${secondaryMinimalDisabledColors}
          }
        `;

      case BUTTON_TYPE.SECONDARY_MINIMAL_LARGE:
        return css`
          ${largeButtonFontStyles}
          ${secondaryMinimalNormalColors}
          &:hover {
            ${secondaryMinimalHoverColors}
          }
          &:disabled {
            ${secondaryMinimalDisabledColors}
          }
        `;

      case BUTTON_TYPE.SECONDARY_DARK_LARGE:
        return css`
          ${largeButtonFontStyles}
          ${secondaryDarkColors}
          &:hover {
            ${secondaryDarkHoverColors}
          }
        `;
    }
  }}
`;

/**
 * PRIMARY SUBTLE BUTTON COLORS
 */

const primarySubtleNormalColors = css`
  color: ${({ theme }) => theme.colors.primary_700};
  border: 1px solid ${({ theme }) => theme.colors.primary_900};
`;

const primarySubtleHoverColors = css`
  color: ${({ theme }) => theme.colors.primary_700};
  background-color: ${({ theme }) => theme.colors.primary_200};
  border: 1px solid ${({ theme }) => theme.colors.primary_950};
`;

const primarySubtleDisabledColors = css`
  color: ${({ theme }) => theme.colors.primary_270};
  border: 1px solid ${({ theme }) => theme.colors.primary_270};
`;

/**
 * PRIMARY DEFAULT BUTTON COLORS
 */

const primaryDefaultNormalColors = css`
  color: ${({ theme }) => theme.colors.shade_200};
  background-color: ${({ theme }) => theme.colors.primary_700};
  border: 1px solid ${({ theme }) => theme.colors.primary_700};
`;

const primaryDefaultHoverColors = css`
  background-color: ${({ theme }) => theme.colors.primary_900};
`;

const primaryDefaultDisabledColors = css`
  background-color: ${({ theme }) => theme.colors.primary_270};
  color: ${({ theme }) => theme.colors.shade_200};
  border: 1px solid ${({ theme }) => theme.colors.primary_270};
`;

/**
 * GHOST DEFAULT BUTTON COLORS
 */
const ghostDefaultNormalColors = css`
  background-color: ${({ theme }) => theme.colors.secondary_200};
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
`;

const ghostDefaultHoverColors = css`
  background-color: ${({ theme }) => theme.colors.secondary_270};
  border: 1px solid ${({ theme }) => theme.colors.secondary_270};
`;

const ghostDefaultDisabledColors = css`
  background-color: ${({ theme }) => theme.colors.secondary_200};
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  color: ${({ theme }) => theme.colors.secondary_270};
`;

/**
 * SECONDARY SUBTLE BUTTON COLORS
 */

const secondarySubtleNormalColors = css`
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
`;

const secondarySubtleHoverColors = css`
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  background-color: ${({ theme }) => theme.colors.shade_270};
`;

const secondarySubtleDisabledColors = css`
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  color: ${({ theme }) => theme.colors.secondary_200};
`;

/**
 * SECONDARY DARK BUTTON COLORS
 */

const secondaryDarkColors = css`
  border: 1px solid ${({ theme }) => theme.colors.secondary_700};
  background-color: ${({ theme }) => theme.colors.secondary_700};
  color: ${({ theme }) => theme.colors.shade_200};
`;

const secondaryDarkHoverColors = css`
  opacity: 0.8;
`;

/**
 * SECONDARY MINIMAL BUTTON COLORS
 */

const secondaryMinimalNormalColors = css`
  background-color: ${({ theme }) => theme.colors.shade_200};
  color: ${({ theme }) => theme.colors.secondary_700};
`;

const secondaryMinimalHoverColors = css`
  background-color: ${({ theme }) => theme.colors.secondary_200};
`;

const secondaryMinimalDisabledColors = css`
  background-color: ${({ theme }) => theme.colors.shade_200};
  color: ${({ theme }) => theme.colors.shade_900};
`;

// =====================================================================================================================

/**
 * LARGE BUTTON STYLES
 */

const largeButtonFontStyles = css`
  height: 52px;
  font-size: 20px;
  line-height: 20px;
  border-radius: 8px;
  padding: 16px 41.5px;
  letter-spacing: 0.0125em;
`;

/**
 * SMALL BUTTON STYLES
 */

const smallButtonFontStyles = css`
  height: 32px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 5px;
  padding: 8px 28px;
  letter-spacing: 0.0125em;
`;
