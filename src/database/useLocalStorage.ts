'use client';

import { useState } from 'react';

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }

    return null;
  });

  const setLocalStorageValue = (value: string) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  return [value, setLocalStorageValue] as const;
}
