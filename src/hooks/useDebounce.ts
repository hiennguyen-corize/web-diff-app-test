'use client';
import { useEffect, useState } from 'react';

/**
 * Returns a debounced version of the given value.
 * Updates only after the specified delay has passed without new changes.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300)
 */
export const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
