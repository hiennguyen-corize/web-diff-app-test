import styled, { css } from 'styled-components';

export const Li = styled.li<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          color: ${theme.colors.primary_700};
        `
      : css`
          color: ${theme.colors.secondary};
          cursor: pointer;
          &:hover {
            opacity: 0.6;
          }
        `};
`;

export const ImageWrapper = styled.div<{ $isActive: boolean }>`
  width: 24px;
  height: 24px;

  img {
    filter: ${({ $isActive }) =>
      $isActive
        ? 'invert(31%) sepia(85%) saturate(5926%) hue-rotate(205deg) brightness(98%) contrast(103%)'
        : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'};
    transition: filter 0.3s ease;
  }
`;

export const TextWrapper = styled.div<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 400)};
  font-size: 16px;
  line-height: 24px;
`;
