import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from './layoutStyles';

export const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
