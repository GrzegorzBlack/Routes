import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Input from "../../components/Input/Input";

import { StyledBoxForm, StyledBoxLogin, StyledBoxPassword } from "./Loginstyle";
import { useLocalState } from "src/utils/useLocalStorage";
import { localStorageGet } from "src/utils/localStorageGet";
import { localStorageSet } from "src/utils/localStorageSet";

const useLocalStoragePathname = (
  defaultValue: string,
  key: string
): [string] => {
  const [value] = useState<string>(() => {
    const localStorageValue = localStorageGet(key);
    if (localStorageValue !== null) {
      return JSON.parse(localStorageValue);
    }
    localStorageSet(key, defaultValue);
    return defaultValue;
  });

  return [value];
};

const useLocalStorageAuth = (
  defaultValue: string | boolean,
  key: string
): [string, Function] => {
  const [value, setValue] = useState<string>(() => {
    const localStorageValue = localStorageGet(key);
    if (localStorageValue !== null) {
      return JSON.parse(localStorageValue);
    }
    localStorageSet(key, defaultValue);
    return defaultValue;
  });

  const setLocalStorageAuthValue = (value: string) => {
    setValue(value);
    localStorageSet(key, value);
  };

  return [value, setLocalStorageAuthValue];
};

export const LoginView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [localStoragePathname] = useLocalStoragePathname("", "authRoute");
  const [authRequired, setAuthRequired] = useLocalStorageAuth(
    true,
    "authRequired"
  );

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!login || !password) {
        return window.alert("Pola nie mogą być puste, wtf dude!"); // dodać translate !!!
      }
      setAuthRequired(false);
      if (localStoragePathname !== null) {
        return navigate(localStoragePathname);
      }
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <StyledBoxForm component='form' onKeyDown={handleOnKeyDown}>
      <StyledBoxLogin>
        <Input
          variant='outlined'
          labelHelperText={t("LoginLabel")}
          fullWidth
          onChangeHandler={handleLoginChange}
        />
      </StyledBoxLogin>
      <StyledBoxPassword>
        <Input
          variant='outlined'
          labelHelperText={t("PasswordLabel")}
          fullWidth
          value={password}
          type='password'
          onChangeHandler={handlePasswordChange}
        />
      </StyledBoxPassword>
    </StyledBoxForm>
  );
};
