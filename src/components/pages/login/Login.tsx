import React, { FC, useState } from 'react';

import { MainPage, LoginForm, LoginLabel, Input, LoginButton, InfoMessage } from './loginStyles';

import { loginResponse, errorResponse } from '~/api/types/login';
import { Dispatch } from '~/store/hooks/hooks';
import { addToken } from '~/store/reducers/tokenReducer';

export const Login: FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(false);
  // const [error, setError] = useState<string | null>(null);
  const dispatch = Dispatch();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const loginChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
    setLogin(event.target.value);
  };
  const passwordChangeHandler = (event: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const userData = {
    login: login,
    password: password,
  };

  const formSubmitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}photographer/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data: loginResponse | errorResponse = await response.json();

      if (!(data as loginResponse).success && !response.ok) {
        setLoading(false);
        alert((data as errorResponse).message);
      }
      if ((data as loginResponse).success && response.ok && !loading) {
        dispatch(addToken((data as loginResponse).token));
        localStorage.setItem('tokenJWT', (data as loginResponse).token);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      alert('Invalid login or password!');
    }

    // setLogin('');
    // setPassword('');
  };

  return (
    <MainPage>
      <LoginForm onSubmit={formSubmitHandler}>
        <LoginLabel htmlFor="login">
          Login
          <Input
            type="text"
            id="login"
            autoComplete="off"
            minLength={4}
            maxLength={16}
            value={login}
            onChange={loginChangeHandler}
            required
          />
        </LoginLabel>
        <LoginLabel htmlFor="password">
          Password
          <Input
            type="password"
            id="password"
            autoComplete="off"
            autoCorrect="off"
            minLength={6}
            maxLength={16}
            onChange={passwordChangeHandler}
            value={password}
            required
          />
        </LoginLabel>
        <LoginButton type="submit"> Log in</LoginButton>
        {loading ? (
          <>
            <InfoMessage>Loading...</InfoMessage>
          </>
        ) : (
          ''
        )}
      </LoginForm>
    </MainPage>
  );
};
