import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './Components/Layout/Layout';
import { Login } from './Pages/Login';

function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={<Layout />}
            >
                <Route
                    path='/'
                    element={<Login />}
                />
            </Route>
        </Routes>
    );
}

export default App;
