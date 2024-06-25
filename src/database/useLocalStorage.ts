import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const item = localStorage.getItem(key);
    setValue(item);
  }, [key]);

  const setLocalStorageValue = (value: string) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  return [value, setLocalStorageValue] as const;
}
