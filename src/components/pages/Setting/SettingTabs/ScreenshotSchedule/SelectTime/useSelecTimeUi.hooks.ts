import { useBooleanState } from '@/hooks/useBooleanState';
import { useClickOutside } from '@/utils/clickOutside';
import { formatHours, formatMinutes } from '@/utils/formatTime';
import { useCallback, useEffect, useRef } from 'react';
import { InputMethodsType } from './HoursInput';

export const useSelectTimeUi = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoursInputRef = useRef<InputMethodsType>(null);

  useEffect(() => {
    hoursInputRef.current?.focus();
    hoursInputRef.current?.select();
  }, []);

  const {
    boolean: isDropdownOpen,
    setTrue: openDropdown,
    setFalse: closeDropdown,
  } = useBooleanState(false);

  useClickOutside(dropdownRef, () => closeDropdown());

  const handleFormatValue = useCallback(
    (value: string, isHours = false, callback: (value: string) => void) => {
      const number = Number(value);

      const formattedValue = isHours
        ? formatHours(number)
        : formatMinutes(number);

      callback(formattedValue.toString());
    },
    []
  );

  return {
    handleFormatValue,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    dropdownRef,
    hoursInputRef,
  };
};
