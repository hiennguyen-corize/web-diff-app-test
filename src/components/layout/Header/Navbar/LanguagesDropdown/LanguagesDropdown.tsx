import { CommonDropdown, OptionType } from '@/components/ui/CommonDropdown';
import { first } from 'lodash';
import { FC, useState } from 'react';
import englandFlag from './assets/england-flag.svg';
import I18nIcon from './assets/i18n-icon.svg';
import japanFlag from './assets/japan-flag.svg';
import { LanguagesDropdownWrapper } from './styles';

const languagesDropdownPosition = {
  optionTop: 60,
  optionRight: -86,
  arrowTop: -15,
  arrowRight: 73,
};

export const LanguagesDropdown: FC = () => {
  const options = [
    {
      value: 0,
      label: 'English',
      icon: englandFlag,
      onClick: (option: OptionType) => handleSelect(option),
    },
    {
      value: 1,
      label: 'Japanese',
      icon: japanFlag,
      onClick: (option: OptionType) => handleSelect(option),
    },
  ];

  const [selected, setSelected] = useState<OptionType | undefined>(
    first(options)
  );

  const handleSelect = (option: OptionType) => {
    if (selected?.value !== option.value) {
      setSelected(option);
    }
  };

  return (
    <LanguagesDropdownWrapper>
      <CommonDropdown
        dropdownPosition={languagesDropdownPosition}
        selected={{ ...selected, label: undefined }}
        selectedIcon={I18nIcon}
        options={options}
      />
    </LanguagesDropdownWrapper>
  );
};
