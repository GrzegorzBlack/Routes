import { useState } from "react";

// To jest stary plik ale go zachowałem !!!

export const useLocalState = (
  defaultValue: string | boolean,
  key: string
): [string, Function] => {
  const [value, setValue] = useState<string>(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue !== null) {
      return JSON.parse(localStorageValue);
    }

    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  });

  const setLocalStorageValue = (value: any) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setLocalStorageValue];
};
