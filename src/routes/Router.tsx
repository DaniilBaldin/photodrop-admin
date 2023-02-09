import React, { FC, FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/common/layout/Layout';

import { routes, protectedRoutes } from './routes';

import { useSelector } from 'react-redux';

import { token } from '@/store/selectors/tokenSelector';
import { RootState } from '@/store/index';

type RouterType = {
    path: string;
    element: FunctionComponent;
};

export const Router: FC = () => {
    const state = useSelector((state) => (state as RootState).tokenReducer);
    const jwtToken = token(state);

    return (
        <Routes>
            <Route
                path='/'
                element={<Layout />}
            >
                {!jwtToken
                    ? routes.map((e: RouterType, index) => (
                          <Route
                              key={index}
                              path={e.path}
                              element={<e.element />}
                          />
                      ))
                    : protectedRoutes.map((e: RouterType, index) => (
                          <Route
                              key={index}
                              path={e.path}
                              element={<e.element />}
                          />
                      ))}
            </Route>
        </Routes>
    );
};
