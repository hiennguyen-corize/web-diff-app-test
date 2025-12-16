import styled, { css } from 'styled-components';

export const LineElement = styled.div<{
  $marginTop: number;
  $marginBottom: number;
  $direction: 'horizontal' | 'vertical';
}>`
  margin-bottom: ${({ $marginBottom }) => `${$marginBottom}px`};
  margin-top: ${({ $marginTop }) => `${$marginTop}px`};
  opacity: 0.5;

  ${({ $direction }) => {
    switch ($direction) {
      case 'horizontal':
        return css`
          height: 1px;
          width: auto;
          border-bottom: 1px solid ${({ theme }) => theme.colors.shade_770};
        `;
      case 'vertical':
        return css`
          height: auto;
          width: 1px;
          border-right: 1px solid ${({ theme }) => theme.colors.shade_770};
        `;
    }
  }}
`;
