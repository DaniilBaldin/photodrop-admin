import { Login } from '../components/pages/login/Login';
import { NotFound } from '../components/pages/notFound/notFound';
import { Albums } from '../components/pages/albums/albums';

export const routes = [
    {
        path: '/',
        element: Login,
    },
    {
        path: '*',
        element: NotFound,
    },
];

export const protectedRoutes = [
    {
        path: '/',
        element: Albums,
    },
    {
        path: '*',
        element: NotFound,
    },
];
