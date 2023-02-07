import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from './styles';

export const Layout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};
