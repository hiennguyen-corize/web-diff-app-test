import styled, { css } from 'styled-components';

export const TitleWrapper = styled.div<{ $isActive: boolean }>`
  padding: 16px 24px;
  border-radius: 8px;
  cursor: pointer;

  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.0125em;
  text-transform: capitalize;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: ${theme.colors.primary_700};
          color: ${theme.colors.shade_200};
        `
      : css`
          &:hover {
            background-color: ${theme.colors.shade_270};
          }
        `}
`;
