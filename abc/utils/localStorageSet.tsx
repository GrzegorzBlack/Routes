export const localStorageSet = (
  key: string,
  defaultValue: string | boolean
) => {
  localStorage.setItem(key, JSON.stringify(defaultValue));
};
