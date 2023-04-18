import React, { FC, FunctionComponent, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '~/components/common/layout/Layout';

import { routes, protectedRoutes } from './routes';

import { tokenSelector } from '~/store/selectors/tokenSelector';
import { Dispatch, Selector } from '~/store/hooks/hooks';
import { addAlbum } from '~/store/reducers/albumsReducer';

type RouterType = {
  path: string;
  element: FunctionComponent;
};

export const Router: FC = () => {
  const jwtToken = Selector(tokenSelector);
  const dispatch = Dispatch();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const getUserAlbums = async () => {
      const response = await fetch(`${baseUrl}photographer/album/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
        body: undefined,
      });
      const data = await response.json();
      if (data) {
        dispatch(addAlbum(data?.albums));
      }
    };

    void getUserAlbums();
    // if (!albums) {
    // }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {!jwtToken
          ? routes.map((e: RouterType, index) => <Route key={index} path={e.path} element={<e.element />} />)
          : protectedRoutes.map((e: RouterType, index) => <Route key={index} path={e.path} element={<e.element />} />)}
      </Route>
    </Routes>
  );
};
