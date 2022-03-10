export const localStorageGet = (key: string) => {
  const localStorageValue: string | null = localStorage.getItem(key);

  return localStorageValue;
};
