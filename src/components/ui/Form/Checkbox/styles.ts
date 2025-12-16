import styled from 'styled-components';

export const CheckboxWrapper = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  width: 18px;
  height: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const InputCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CheckMark = styled.span<{ $checked: boolean }>`
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary_700 : theme.colors.secondary_270};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2px;

  &::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 2.5px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
