import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { resetToken } from '../../../store/actions/actions';

import { Header, LogoutButton } from './headerStyles';

export const HeaderComponent: FC = () => {
    const dispatch = useDispatch();

    const logOutHAndler = () => {
        localStorage.setItem('token', '');
        dispatch(resetToken());
    };
    return (
        <Header>
            <div>
                <LogoutButton onClick={logOutHAndler}>Log out</LogoutButton>
            </div>
        </Header>
    );
};
