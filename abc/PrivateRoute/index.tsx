import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { localStorageGet } from "src/utils/localStorageGet";
import { localStorageSet } from "src/utils/localStorageSet";
import { useLocalState } from "../../utils/useLocalStorage";

const useLocalStorageAuth = (
  defaultValue: string | boolean,
  key: string
): [string] => {
  const [value] = useState<string>(() => {
    const localStorageValue = localStorageGet(key);
    console.log(localStorageValue);
    if (localStorageValue !== null && localStorageValue !== "") {
      return JSON.parse(localStorageValue);
    }
    localStorageSet(key, defaultValue);
    return defaultValue;
  });

  return [value];
};

const useLocalStoragePathname = (
  defaultValue: string,
  key: string
): [string, Function] => {
  const [value, setValue] = useState<string>(() => {
    const localStorageValue = localStorageGet(key);
    if (localStorageValue !== null && localStorageValue !== "") {
      return JSON.parse(localStorageValue);
    }
    localStorageSet(key, defaultValue);
    return defaultValue;
  });
  const setLocalStorageValue = (value: string) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setLocalStorageValue];
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const [authRequired] = useLocalStorageAuth(false, "authRequired");
  const [route, setAuthRoute] = useLocalStoragePathname("", "authRoute");

  useEffect(() => {
    if (authRequired) {
      setAuthRoute(location.pathname);
    }
  }, [authRequired]);

  return authRequired ? <Navigate to='/login' /> : children; // tutaj Navigate a tam useNavigate ???
};

export default PrivateRoute;
