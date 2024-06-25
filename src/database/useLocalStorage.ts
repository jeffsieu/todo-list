import { useState } from 'react';

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key);
  });

  const setLocalStorageValue = (value: string) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  return [value, setLocalStorageValue] as const;
}
