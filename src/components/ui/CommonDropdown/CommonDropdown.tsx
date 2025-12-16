import { useBooleanState } from '@/hooks/useBooleanState';
import { useClickOutside } from '@/utils/clickOutside';
import { FC, useCallback, useRef } from 'react';
import {
  DropdownWrapper,
  Option,
  OptionIcon,
  OptionsSection,
  OptionTitle,
  SelectedIcon,
  SelectedSection,
  SelectedTitle,
} from './styles';

export type OptionType = {
  label: string;
  value: number;
  icon: string;
  onClick: ((option: OptionType) => void) | undefined;
};

export type DropdownPositionType = {
  optionTop: number;
  optionRight: number;
  arrowTop: number;
  arrowRight: number;
};

type Props = {
  selectedIcon?: string;
  options: OptionType[];
  selected?: Partial<OptionType>;
  dropdownPosition: DropdownPositionType;
};

export const CommonDropdown: FC<Props> = ({
  options,
  selected,
  selectedIcon,
  dropdownPosition,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { arrowRight, arrowTop, optionRight, optionTop } = dropdownPosition;

  const {
    boolean: isShow,
    setFalse: handleClose,
    toggle: handleToggle,
  } = useBooleanState(false);

  const handleSelect = useCallback(
    (option: OptionType) => {
      option.onClick?.(option);
      handleClose();
    },
    [handleClose]
  );

  useClickOutside(ref, handleClose);

  return (
    <DropdownWrapper ref={ref}>
      <SelectedSection onClick={handleToggle}>
        {!!selected?.label && <SelectedTitle>{selected.label}</SelectedTitle>}
        {!!selectedIcon && (
          <SelectedIcon src={selectedIcon} alt={'Selected icon'} />
        )}
      </SelectedSection>

      {isShow && (
        <OptionsSection
          $optionTop={optionTop}
          $arrowRight={arrowRight}
          $arrowTop={arrowTop}
          $optionRight={optionRight}
        >
          {options.map((option, index) => (
            <Option
              key={option.value}
              $isFirst={index === 0}
              onClick={() => handleSelect(option)}
              $isLast={index + 1 === options.length}
              $isActive={option.value === selected?.value}
            >
              <OptionIcon
                width={26}
                height={26}
                src={option.icon}
                alt={option.label}
              />
              <OptionTitle>{option.label}</OptionTitle>
            </Option>
          ))}
        </OptionsSection>
      )}
    </DropdownWrapper>
  );
};
