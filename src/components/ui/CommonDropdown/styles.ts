import Image from 'next/image';
import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const SelectedSection = styled.div`
  display: flex;
  cursor: pointer;
  gap: 14px;
  font-size: 24px;
  line-height: 24px;
`;

export const SelectedTitle = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 24px;
  text-align: right;
`;

export const SelectedIcon = styled(Image)``;

export const OptionsSection = styled.ul<{
  $optionTop: number;
  $optionRight: number;
  $arrowTop: number;
  $arrowRight: number;
}>`
  display: flex;
  min-width: 200px;
  position: absolute;
  border-radius: 8px;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  top: ${({ $optionTop }) => `${$optionTop}px`};
  right: ${({ $optionRight }) => `${$optionRight}px`};
  background-color: ${({ theme }) => theme.colors.shade_200};

  &::before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    transform: rotate(-62deg);
    top: ${({ $arrowTop }) => `${$arrowTop}px`};
    right: ${({ $arrowRight }) => `${$arrowRight}px`};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    background-color: ${({ theme }) => theme.colors.shade_200};
    clip-path: polygon(8% -85%, 99% -5%, 68% 58%, 48% 20%);
  }
`;

export const Option = styled.li<{
  $isFirst: boolean;
  $isLast: boolean;
  $isActive: boolean;
}>`
  padding: 10px 31px;
  cursor: pointer;
  display: flex;
  gap: 23px;

  border-radius: ${({ $isFirst, $isLast }) => {
    if ($isFirst) {
      return `8px`;
    }

    if ($isLast) {
      return `0 0 8px 8px`;
    }

    return '0';
  }};

  border: 1px solid
    ${({ $isActive, theme }) =>
      $isActive ? `${theme.colors.secondary_900}` : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.shade_270};
  }

  img {
    min-width: 26px;
  }
`;

export const OptionIcon = styled(Image)``;

export const OptionTitle = styled.div`
  font-size: 21px;
  line-height: 25.5px;
  white-space: nowrap;
`;
