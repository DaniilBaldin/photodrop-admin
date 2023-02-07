import React, { FC } from 'react';
import { MainPage } from './styles';
import { useDispatch } from 'react-redux';
import { resetToken } from '../../../store/actions/actions';

export const Albums: FC = () => {
    const dispatch = useDispatch();

    const logOutHAndler = () => {
        localStorage.setItem('token', '');
        dispatch(resetToken());
    };
    return (
        <MainPage>
            <h2>Albums page!</h2>
            <button onClick={logOutHAndler}>Log out</button>
        </MainPage>
    );
};
