'use client';
import { useCallback, useState } from 'react';

/**
 * Boolean state hook.
 * @param initial
 */
export const useBooleanState = (initial = false) => {
  const [boolean, setBoolean] = useState(initial);

  const setTrue = useCallback(() => setBoolean(true), []);

  const setFalse = useCallback(() => setBoolean(false), []);

  const toggle = useCallback(() => setBoolean((prev) => !prev), []);

  return Object.assign(
    [boolean, setTrue, setFalse, toggle] as const,
    { boolean, setTrue, setFalse, toggle } as const
  );
};
